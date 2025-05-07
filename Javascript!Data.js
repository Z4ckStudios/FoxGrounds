const dataStore = async () => {
	try {
	const res = await fetch("/data", {
		method: "GET"
	})
	if(res.ok) {
		const data = await res.json();
		localStorage.setItem("item", data);
		sessionStorage.setItem("item", data);
		send_data(data);
        console.log(data);
	} else {
		console.error("Failed to send/retrieve data")
	}
} catch (err) {
	console.error(err.stack)
}
}

const targetOrigin = "localhost:3000"
const send_data = (data) => {
	const iframe = document.querySelector("iframe");
	const window = iframe.contentWindow;
	window.postMessage(JSON.stringify(data), "*")
}