<script>
  import "../app.css";
</script>

<nav class="font-bebas p-2 bg-slate-200 text-3xl">
  <div class="mx-8 flex justify-evenly">
    <p >🎶 Musical Mosaic</p>
    <ul class="flex gap-4">
      <li> <a href="/">Home</a></li> 
      <li> <a href="/about">About</a></li> 
      <li> <a href="/privacy">Privacy Policy</a></li> 
    </ul>
  </div>
  
  
</nav>

<slot class="container mx-auto"/>

<footer class="flex justify-center font-bebas bg-slate-200 my-4">
  <p>Made with ❤ by  <a href="https://github.com/Jyodann/">Jyodann</a></p>
</footer>