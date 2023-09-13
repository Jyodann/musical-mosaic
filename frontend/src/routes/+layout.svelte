<script>
  import "../app.css";

  let hide_nav = true
</script>


<nav class="flex items-center justify-between flex-wrap bg-slate-200 p-2 font-bebas text-2xl md:flex md:justify-evenly">
  <div class="flex items-center ">
    <p>🎶 Musical Mosaic</p>
  </div>

  <div class="block md:hidden">
    <button class="items-center flex px-3 py-2 border border-black rounded" on:click={() => hide_nav = !hide_nav}>
      <svg class="fill-current h-3 w-3 {!hide_nav ? 'hidden' : ''}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      <svg class="fill-current h-3 w-3 {hide_nav ? 'hidden' : ''}" viewBox="0 0 12 12" 
     xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="11" 
          x2="11" y2="1" 
          stroke="black" 
          stroke-width="2"/>
    <line x1="1" y1="1" 
          x2="11" y2="11" 
          stroke="black" 
          stroke-width="2"/>
</svg>
    </button>
  </div>

  <div class="w-full block {hide_nav ? 'hidden' : ''} md:inline-block md:w-auto md:gap-2 items-center">
    <a href="/" class="block md:inline-block md:px-2 pt-2"> 
      Home
    </a>

    <a href="/about" class="block md:inline-block md:px-2 pt-2"> 
      About
    </a>

    <a href="/privacy" class="block md:inline-block md:px-2 pt-2" > 
      Privacy Policy
    </a>
  </div>
</nav>

<slot class="container mx-auto"/>

<footer class="flex justify-center font-bebas bg-slate-200 my-4">
  <p>Made with ❤ by  <a href="https://github.com/Jyodann/" class="underline">Jyodann</a></p>
</footer>