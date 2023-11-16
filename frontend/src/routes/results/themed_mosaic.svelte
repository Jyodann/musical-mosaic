<script>
    export let songs = [];
    export let username = "";
    export let red_value = 0;
    export let green_value = 0;
    export let blue_value = 0;

    let luma = 0;

    function get_pixel_of_center_image(url) {
        const pic = new Image();
        var canvas = document.createElement("canvas");
        pic.crossOrigin = "anonymous";
        pic.src = url;

        pic.onload = function () {
            canvas.width = pic.width;
            canvas.height = pic.height;
            var ctx = canvas.getContext("2d");

            ctx.drawImage(pic, 0, 0);

            var c = canvas.getContext("2d");
            var p = c?.getImageData(pic.width / 2, pic.height / 2, 1, 1).data;

            red_value = p[0];
            green_value = p[1];
            blue_value = p[2];

            luma =
                0.2126 * red_value + 0.7152 * green_value + 0.0722 * blue_value;
        };
    }

    function return_url(song_json) {
        return song_json.album.images[0].url;
    }
</script>

<div class="w-80 font-sans" id="mosaic">
    <div
        class="h-6 flex justify-center items-center px-2"
        style="background-color: rgb({red_value}, {green_value}, {blue_value});"
    >
        <p
            class="text-lg font-bebas tracking-normal {luma < 40
                ? 'text-white'
                : 'text-black'}"
        >
            {username}'s Musical Mosaic
        </p>
    </div>

    <div class="grid grid-cols-5">
        {#each songs as song, idx}
            {#if idx === 6}
                <img
                    id="example"
                    on:load={() => get_pixel_of_center_image(return_url(song))}
                    class="row-span-3 col-span-3 object-fill"
                    src={return_url(song)}
                    alt="Album Art for {song.name}"
                />
            {:else}
                <img src={return_url(song)} alt="Album Art for {song.name}" />
            {/if}
        {/each}
    </div>

    <div
        style="background-color: rgb({red_value}, {green_value}, {blue_value});"
        class="h-6 flex justify-between items-center px-2 {luma < 40
            ? 'text-white'
            : 'text-black'}"
    >
        <img
            class="h-full py-1"
            src={luma < 40 ? "spot_logo_white.png" : "spot_logo_black.png"}
            alt="Spotify Logo"
        />
        <p class="font-bebas tracking-wider text-sm">
            {window.location.host}
        </p>
    </div>
</div>
