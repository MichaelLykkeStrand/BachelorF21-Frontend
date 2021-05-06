<script>
    import { get } from '$lib/utils.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { session } from '$app/stores';

    export let courseId;

    let courseName;
    async function getCourse(){
        try {
            let resp = await get("courses/course?courseId=" + courseId);
            courseName = resp.name;
            courseName = courseName;
		} catch (err) {
			console.log("i failed at getting courses:) this is why:" + err);
		}
    }

    function submit(){
        goto("course/" + courseId);        
    }

    onMount(async () => {
        getCourse().catch(() => {console.log("promise rejected for courseget")});
	});
</script>

<button on:click={submit} class="rounded-3 border border-dark container-fluid m-2 p-2 bg-dark w-25" style="min-width: 200px;">
    <div class="row" style="height: 230px;">
        <div class="col-sm ">
            <h5 class="text-white-50">
                <!-- <slot name="courseName">
                    <span class="missing">undefined coursename</span>
                </slot> -->
                {courseName}
            </h5>        
        </div>
    </div>
</button>