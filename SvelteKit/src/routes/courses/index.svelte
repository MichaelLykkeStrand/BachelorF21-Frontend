<script>
    import CourseCardView from '../components/courses/course_card_view.svelte';
    import { post } from '$lib/api.js';
</script>

<script context="module">
    export async function load( {page, session }){
        if(!session.user){
            return { redirect: `/login`, status: 302 };    
        } else{
        }

        return {};
    }
</script>



<body>
	<CourseCardView>
    </CourseCardView>
</body>
