<script>
    import { goto, stores } from "@sapper/app";
	import axios from "axios";

    export let courseId;
    let courseName;
    async function getCourses(){
        try {
			const response = await axios.get(
				("http://localhost:3600/courses/" + courseId)
			);
            courseName = response.data.name;
            courseName = courseName;
		} catch (err) {
			console.log("i failed at getting courses:) this is why:" + err);
		}
    }

    getCourses().catch(console.log("promise rejected for courseget"));
</script>

<div class="rounded-3 border border-dark container-fluid my-2 p-2 bg-dark w-25" style="min-width: 200px;">
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
</div>