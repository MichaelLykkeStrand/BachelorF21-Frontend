<script>
	import NavbarProfile from '../components/navbar_profile.svelte';
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light" style="max-height: 65px">
    <div class="container-fluid">
        <a class="navbar-brand" href="#" alt="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" alt="#">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" alt="#">Link</a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" alt="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#" alt="#">Action</a></li>
                <li><a class="dropdown-item" href="#" alt="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" alt="#">Something else here</a></li>
            </ul>
            </li>
            <li class="nav-item">
            <a class="nav-link disabled" href="#" alt="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
        </ul>
        </div>
    </div>
    <div>
        <NavbarProfile></NavbarProfile>
    </div>
</nav>