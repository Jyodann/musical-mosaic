<script>
    import { onMount } from "svelte";
    import { stored_token } from "../../stores";
    import { goto } from "$app/navigation";
    import { get_link } from "$lib";
    import PompomError from "./pompom_error.svelte";
    import CurrentTermButton from "./current_term_button.svelte";
    import Mosaic from "./mosaic.svelte";
    import ThemedMosaic from "./themed_mosaic.svelte";
    let songs = [];
    let orignal_song_list = [];
    let username = "";
    let access_token;
    let number_of_songs = 0;
    let CURRENT_TERM = "";
    let themed_mosaic_check = true;

    let red_value = 0;
    let green_value = 0;
    let blue_value = 0;

    const SHORT_TERM = "short_term";
    const MEDIUM_TERM = "medium_term";
    const ALL_TIME = "long_term";

    async function change_term(
        term_to_change,
        access_token,
        orignal_song_list
    ) {
        const res = await fetch(
            `https://api.spotify.com/v1/me/top/tracks?limit=17&time_range=${term_to_change}`,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                },
            }
        );

        const res_json = await res.json();

        number_of_songs = res_json.total;

        orignal_song_list = structuredClone(res_json["items"]);

        songs = structuredClone(orignal_song_list);

        const top_song = songs.shift();

        songs.splice(6, 0, top_song);

        CURRENT_TERM = term_to_change;
    }

    onMount(async () => {
        stored_token.subscribe((value) => {
            access_token = value;
        });

        if (access_token === "") {
            const link = get_link(window.location.origin);
            goto(link);
        }

        const user_res = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + access_token,
            },
        });

        const user_res_json = await user_res.json();
        username = user_res_json["display_name"];

        CURRENT_TERM = MEDIUM_TERM;
        change_term(CURRENT_TERM, access_token, orignal_song_list);
    });
</script>

<svelte:head>
    <title>Music Mosaic Results</title>
</svelte:head>
{#if username !== ""}
    <div class="flex flex-col place-items-center">
        <div class="flex flex-col md:w-[40rem] place-items-center">
            <p class="font-bebas text-4xl pt-2">Your Mosaic</p>
            <p class="font-bebas text-xl">Change time period:</p>
            <div class="w-80 font-bebas flex justify-evenly py-2">
                <CurrentTermButton
                    component_term={SHORT_TERM}
                    current_term={CURRENT_TERM}
                    title="4 Weeks"
                    on:click={() =>
                        change_term(
                            SHORT_TERM,
                            access_token,
                            orignal_song_list
                        )}
                />
                <CurrentTermButton
                    component_term={MEDIUM_TERM}
                    current_term={CURRENT_TERM}
                    title="6 Months"
                    on:click={() =>
                        change_term(
                            MEDIUM_TERM,
                            access_token,
                            orignal_song_list
                        )}
                />
                <CurrentTermButton
                    component_term={ALL_TIME}
                    current_term={CURRENT_TERM}
                    title="All Time"
                    on:click={() =>
                        change_term(ALL_TIME, access_token, orignal_song_list)}
                />
            </div>

            <div class="w-80 flex justify-evenly font-bebas">
                <p>Use Themed Mosaic:</p>
                <input class="accent-purple-300" bind:checked={themed_mosaic_check} type="checkbox" />
            </div>

            {#if number_of_songs >= 17}
                {#if themed_mosaic_check}
                    <ThemedMosaic
                        {songs}
                        {red_value}
                        {blue_value}
                        {green_value}
                        {username}
                    />
                {:else}
                    <Mosaic {songs} {username} />
                {/if}

                <p class="font-bebas text-center text-2xl">Featured Tracks</p>
                <div class="w-80 font-bebas h-40 overflow-auto">
                    {#each songs as song}
                        <div class="p-2 overflow-auto">
                            <div
                                class="text-center bg-purple-300 p-2 rounded-lg"
                            >
                                {song.name} by {song.artists
                                    .map((x) => x.name)
                                    .join(", ")}
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <PompomError />
            {/if}
        </div>
    </div>
{/if}
