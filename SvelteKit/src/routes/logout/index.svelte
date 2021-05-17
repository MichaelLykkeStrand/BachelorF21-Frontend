
  <script>
    // imports
    import { post } from '$lib/utils.js';
    import { session } from '$app/stores';
    import { onMount } from "svelte";


    async function logout() {
    let user = { email: "d", password: "d" };
    const res = post("auth/login", user);
    //Does not work!
    console.log("User: "+$session.user);
    $session.user = undefined;
    console.log("User: "+$session.user);
    }


    onMount(async () => {
      // `location.replace` forces a hard refresh in the browser,
      // which pulls fresh session data from the server
      await logout();
      setTimeout(() => location.replace("/login"), 2500);
    });

  </script>
  
  <style type="text/scss">
    .splash {
      text-align: center;
      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1rem;
        line-height: 1.33;
        margin-bottom: 0.25rem;
      }
    }
  </style>
  
  <section class="splash">
    <h2>Logout successful</h2>
  
    <p>See ya later!</p>
    <p>Redirection in T minus 2.5 seconds...</p>
  </section>