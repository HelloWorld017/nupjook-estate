import iziToast from 'izitoast';

export default async (promise, name) => {
	try {
		const result = await promise;

		iziToast.success({
			title: 'Success!',
			message: `Successfully finished ${name}`
		});

		return result;
	} catch(err) {
		iziToast.error({
			title: 'Error!',
			message: `There was an error while ${name}<br>Reason: ${err.message}`
		});
	}

	return null;
};
