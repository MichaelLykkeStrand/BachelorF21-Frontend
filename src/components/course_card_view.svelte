<script>
	import CourseCard from '../components/course_card.svelte';
    import { goto, stores } from "@sapper/app";
	import axios from "axios";

	const { session } = stores();

	let courseList = [];

    async function getCourses(){
        try {
			const response = await axios.get(
				("http://localhost:3600/users/courses/" + $session.userId)
			);
            courseList = response.data.courses;
		} catch (err) {
			console.log("i failed at getting courses:) this is why:" + err);
		}
    }

    getCourses().catch(console.log("get courses caught and failed"));

</script>

<div class="container d-flex">
    <div class="row m-2">
        {#each courseList as name, i}
            <CourseCard courseId={name}>
            </CourseCard>
        {/each}
    </div>
</div>