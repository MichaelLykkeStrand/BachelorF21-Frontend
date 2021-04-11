<script>
	import NavbarProfile from './navbar_profile.svelte';
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light" style="max-height: 65px">
    <div class="container-fluid">
        <a class="navbar-brand" href="/main" alt="#">
            <img class="img-fluid rounded-circle" style="max-height: 50px;" src="https://cdn.discordapp.com/attachments/403654574918860811/814428996070539274/vrbt.png" alt="http://placehold.it/150X150">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/main" alt="#">Home</a>
            </li>
            <!-- <li class="nav-item">
            <a class="nav-link" href="#" alt="#">Link</a>
            </li>> -->
        </ul>
        </div>
    </div>
    <div>
        <NavbarProfile></NavbarProfile>
    </div>
</nav>