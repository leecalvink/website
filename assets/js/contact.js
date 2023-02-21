const submitMsg = document.getElementById("submit-msg"), //button
  htmlForm = document.getElementById("contact-form"), //contact form
  endpoint = "https://n86tujd817.execute-api.us-west-2.amazonaws.com/prod/email", //call lambda function
  formData = new FormData(form); //data to submit
submit-msg.addEventListener('click', () => { //call on button press
  fetch(endpoint, {
	method: "post",
	body: formData
  }).then(response => {
	if (reponse.ok) {
	  return response.json();
	} else {
	  throw new Error('HTTP error. Status: ${response.status}');
	}
  }).then(data => {
	console.log('TODO: Show a Success pop up modal here');
  }).catch(error => {
	console.log('Error catching here, TODO: work on this later');
  });
});
