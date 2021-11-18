function generateStyle() {
	document.body.innerHTML += `
		<style type="text/css">
			@font-face {
				font-family: 'Material Icons';
				font-style: normal;
				font-weight: 400;
				src: url(https://fonts.gstatic.com/s/materialicons/v115/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
			}

			.material-icons {
				font-family: 'Material Icons' !important;
				font-weight: normal;
				font-style: normal;
				font-size: 24px;
				line-height: 1;
				letter-spacing: normal;
				text-transform: none;
				display: inline-block;
				white-space: nowrap;
				word-wrap: normal;
				direction: ltr;
				-webkit-font-feature-settings: 'liga';
				-webkit-font-smoothing: antialiased;
			}

			#arkalytics-panel {
				background : #12141d;
				height: 100vh;
				width: 700px;
				top: 0px;
				right: 0px;
				position: fixed;
				box-shadow: -5px 0px 10px 6px rgb(0 0 0 / 50%);
				transition: right .3s ease;
				z-index: 9999;
				padding: 15px;
				overflow-y: auto;
				opacity: .95;
			}

			#arkalytics-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;
			}
			#arkalytics-panel p,
			#arkalytics-panel h1 {
				margin: 0px;
				color: #fff;
			}
			#arkalytics-title {
				font-size: 24px;
				font-weight: 400;
			}
			#arkalytics-close {
				cursor: pointer;
				color: #ffff;
				transition: color .3s ease;
			}
			#arkalytics-close:hover {
				color: #ea1646;
			}
			.ark__grid-layout {
				display: grid;
				grid-auto-columns: 1fr;
				grid-template-rows: auto;
				grid-row-gap: 24px;
				grid-column-gap: 24px;
			}
			.ark__2-grid {
				grid-template-columns: 1fr 1fr;
			}
			.ark__item {
				align-items: flex-start;
				color: #fff;
			}
			.ark__border {
				border-bottom: 1px solid #20222e;
				padding-bottom: 10px;
				margin-bottom: 10px;
			}
			.ark__item__notes {
				color: rgba(255, 255, 255, .7);
				margin-bottom: 15px;
			}
			.ark__item__default {
				grid-template-columns: 200px 2fr;
			}
			.ark__element__border {
				border: 3px solid #ff4b54;
			}
			.ark__item__title {
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
				justify-content: flex-end;
			}
			.ark__item__title .material-icons {
				margin-right: 10px;
				color: #33d69f;
			}
			.ark__item__title.failed .material-icons {
				color: #ff4b54;
			}
			.ark__list {
				color: #fff;
				padding-left: 2em;
			}
			.ark__list li {
				margin-bottom: 10px;
				list-style-type: disc;
			}
		</style>`
}

function reset() {
	document.querySelectorAll(".ark__item").forEach(e =>
		e.remove()
	);

	document.querySelectorAll(".ark__list").forEach(e =>
		e.remove()
	);

	document.querySelectorAll("[aria-arkalytics-border").forEach(e =>
		e.classList.remove("ark__element__border")
	);
}

function closePanel() {
	let panel = document.getElementById("arkalytics-panel");
	panel.style.right	= "-730px";
	let body			= document.body;
	body.style.width	= "100%";
}

function metaTitle() {
	const title	= document.title;
	return title ? title : false;
}

function metaDescription() {
	const description = document.head.querySelector('meta[name="description"]')
	return description ? description.getAttribute('content') : false;
}

function robots() {
	var http = new XMLHttpRequest();
	http.open("HEAD", "/robots.txt", false);
	http.send();
	if (http.status == 404) {
		return false
	} else {
		return window.location.protocol + "//" + window.location.host + "/robots.txt";;
	}
}

function sitemap() {
	var http = new XMLHttpRequest();
	http.open("HEAD", "/sitemap.xml", false);
	http.send();
	if (http.status == 404) {
		return false
	} else {
		return window.location.protocol + "//" + window.location.host + "/sitemap.xml";;
	}
}

function imageAlt() {
	let errors	= [];
	document.querySelectorAll("img").forEach(e => {
		if (e.alt == "") {
			e.classList.add("ark__element__border")
			e.setAttribute("aria-arkalytics-border", "true");
			errors.push(e.src);
		}
	});
	return [errors, errors.length > 0 ? false : true]
}

function favicon() {
	return true	
}

function generateDefaultItem(item_name, test, test_success, test_failed, border) {
	let item	= document.createElement("div");
	item.setAttribute("class", "ark__grid-layout ark__2-grid ark__item ark__item__default");
	if (border) {
		item.classList.add("ark__border");
	}

	let title	= document.createElement("div");
	title.setAttribute("class", "ark__item__title");
	if (!test) {
		title.classList.add("failed");
	}
	let title_icon	= document.createElement("span");
	title_icon.setAttribute("class", "material-icons");
	title_icon.innerText = !test ? "close" : "check";
	title.innerText	= item_name;
	title.append(title_icon);
	item.append(title);

	let data		= document.createElement("div");
	
	let notes		= document.createElement("div");
	notes.setAttribute("class", "ark__item__notes")
	notes.innerText = test ? test_success : test_failed;
	
	let value		= document.createElement("div");
	value.setAttribute("class", "ark__item__value")
	value.innerText	= test ? test : "";

	data.append(notes);
	data.append(value);
	item.append(data);
	return item;
}

function generateList(list) {
	let container	= document.createElement("ul");
	container.setAttribute("class", "ark__list ark__border");
	let item;

	for (let i = 0; i < list.length; i++) {
		item			= document.createElement("li");
		item.innerText	= list[i];
		container.append(item);
	}

	return container;
}

function analyze() {
	reset();

	let panel = document.getElementById("arkalytics-panel");

	// Meta title
	panel.append(generateDefaultItem(
		"Meta Title",
		metaTitle(),
		"Congratulations! Your page is using a title tag",
		"Your page is not using a title tag",
		true)
	);
	// Meta description
	panel.append(generateDefaultItem(
		"Meta Description",
		metaDescription(),
		"Congratulations! Your page is using a description tag",
		"Your page is not using a description tag",
		true)
	);
	// Robots.txt
	panel.append(generateDefaultItem(
		"Robots.txt",
		robots(),
		"Congratulations! Your website uses a \"robots.txt\" file",
		"Your website is not using a \"robots.txt\" file",
		true)
	);
	// Sitemap.xml
	panel.append(generateDefaultItem(
		"Sitemap.xml",
		sitemap(),
		"Congratulations! Your website is using a \"sitemap.xml\" file",
		"Your website is not using a \"sitemap.xml\" file",
		true)
	);

	// Image alts
	const imageAlts	= imageAlt();
	panel.append(generateDefaultItem(
		"Image Alt",
		imageAlts[1],
		"All of your page's <img> tags have the required \"alt\" attribute",
		"The following <img> tags do not have the required \"alt\" attribute",
		false)
	);
	panel.append(generateList(imageAlts[0]));
}

function createPanel() {
	generateStyle();
	let panel				= document.createElement("div");
	panel.setAttribute("id", "arkalytics-panel");

	let header					= document.createElement("div");
	header.setAttribute("id", "arkalytics-header");

	let title				= document.createElement("h1");
	title.setAttribute("id", "arkalytics-title");
	title.innerText 		= "Arkalytics";

	let close				= document.createElement("span");
	close.setAttribute("id", "arkalytics-close");
	close.setAttribute("class", "material-icons");
	close.innerText			= "close";
	close.onclick			= closePanel;

	header.append(title);
	header.append(close);
	panel.append(header);

	document.body.appendChild(panel);
}

if (!document.getElementById("arkalytics-panel")) {
	createPanel();
} else {
	let panel = document.getElementById("arkalytics-panel");
	document.body.appendChild(panel);
	panel.style.right	= "0px";
}

analyze();