<script>
	import CourseCard from './course_card.svelte'
    import { post } from '$lib/utils.js';
    import { onMount } from 'svelte';
	let courseList = [];

    async function getCourses(){
        try {
            let resp = await post("courses/courseList");
            console.log("courseRes: " + resp.courses);
            courseList = resp.courses;
		} catch (err) {
			console.log("coursecardview:" + err);
		}
    }

    onMount(async () => {
        getCourses().catch(() => console.log("get courses caught and failed"));
	});


</script>

<div class="container d-flex">
    <div class="row m-2">
        {#each courseList as name, i}
            <CourseCard courseId={name}>
            </CourseCard>
        {/each}
    </div>
</div>