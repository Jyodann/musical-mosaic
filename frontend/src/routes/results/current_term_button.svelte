<script>
    export let component_term = "DEFAULT";
    export let current_term = "SHORT_TERM";
    export let title = "DEFAULT"
</script>

<button
    class="px-4 w-24 text-center {current_term === component_term
        ? 'bg-purple-300'
        : ''} w-24 text-center"
    on:click>{title}</button
>
