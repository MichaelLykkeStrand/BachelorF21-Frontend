<script>
	import CourseCard from '../components/course_card.svelte';
    import { stores } from "@sapper/app";
	import axios from "axios";

	const { session } = stores();

	let courseList = [];
    let reqBody = {token: $session.token, userId: $session.userId};

    async function getCourses(){
        try {
			const response = await axios.post(
				("http://localhost:3000/course/courseList"), 
                reqBody
			);
            courseList = response.data;
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