<script>
	import { get } from '$lib/utils.js';
	export let taskId;
	let task = { description: '', type: '' };

	async function getTask() {
		try {
			let resp = await get('tasks/task?taskId=' + taskId);
			task = resp;
		} catch (err) {
			console.log('i failed at getting courses:) this is why:' + err);
		}
	}
</script>

<div
	class="rounded-3 border border-dark container-fluid m-2 p-2 bg-dark w-25"
	style="min-width: 200px;"
>
	<div class="row" style="height: 230px;">
		<div class="col-sm ">
			<h5 class="text-white-50">
				{task.name}
			</h5>
			{#if task.type != 'vr'}
				<p>{task.description}</p>
			{/if}
		</div>
	</div>
</div>
