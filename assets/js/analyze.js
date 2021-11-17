function generateStyle() {
	document.body.innerHTML += `
		<style type="text/css">
			#arkalytics-panel {
				background : #12141d;
				height: 100vh;
				width: 500px;
				top: 0px;
				right: 0px;
				position: fixed;
				box-shadow: 0 0 10px 0px rgb(0 0 0 / 30%);
				transition: right .3s ease;
				z-index: 9999;
				padding: 15px;
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
				font-weight: 400;
				font-size: 18px;
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
				border-bottom: 1px solid #20222e;
				padding-bottom: 10px;
				margin-bottom: 10px;
			}
			.ark__item__notes {
				color: rgba(255, 255, 255, .7);
				margin-bottom: 15px;
			}
			.ark__item__default {
				grid-template-columns: 1fr 2fr;
			}
			.ark__element__border {
				border: 3px solid #ff4b54;
			}
		</style>`
}

function reset() {
	document.querySelectorAll(".ark__item").forEach(e =>
		e.remove()
	);

	document.querySelectorAll("[aria-arkalytics-border").forEach(e =>
		e.classList.remove("ark__element__border")
	);
}

function closePanel() {
	let panel = document.getElementById("arkalytics-panel");
	panel.style.right	= "-550px";
	let body			= document.body;
	body.style.width	= "100%";
}

function getScrollbarWidth() {
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll';
	outer.style.msOverflowStyle = 'scrollbar';
	document.body.appendChild(outer);
	
	const inner = document.createElement('div');
	outer.appendChild(inner);
	
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;
}

function shrinkBody() {
	let body			= document.body;
	let scrollbarWidth	= getScrollbarWidth();
	body.style.width	= "calc(100vw - 500px - " + scrollbarWidth + "px)";
}

function metaTitle() {
	const title	= document.title;
	return title ? title : false;
}

function metaDescription() {
	const description = document.head.querySelector('meta[name="description"]')
	return description ? description.getAttribute('content') : false;
}

function headingTags() {
	const h1	= document.getElementsByTagName("h1");
	const h2	= document.getElementsByTagName("h2");
	let status;

	let h1_tags	= [];
	if (h1.length > 0) {
		for (let i = 0; i < h1.length; i++) {
			h1_tags.push(h1[i].innerText);
		}
	}

	let h2_tags	= [];
	if (h2.length > 0) {
		for (let i = 0; i < h2.length; i++) {
			h2_tags.push(h2[i].innerText);
		}
	}

	if (h1.length == 0 || h2.length == 0) {
		status = false;
	} else {
		status = true;
	}
	return {
		status: status,
		h1: h1_tags,
		h2: h2_tags
	}

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
	document.querySelectorAll("img").forEach(e => {
		if (e.alt == "") {
			e.classList.add("ark__element__border")
			e.setAttribute("aria-arkalytics-border", "true");
		}
	});
}

function favicon() {
	return true	
}

function generateDefaultItem(item_name, test, test_success, test_failed) {
	let item	= document.createElement("div");
	item.setAttribute("class", "ark__grid-layout ark__2-grid ark__item ark__item__default");

	let title	= document.createElement("div");
	title.innerText	= item_name;
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

function analyze() {
	reset();

	let panel = document.getElementById("arkalytics-panel");

	// Meta title
	panel.append(generateDefaultItem(
		"Meta Title",
		metaTitle(),
		"Congratulations! Your page is using a title tag",
		"Your page is not using a title tag")
	);
	// Meta description
	panel.append(generateDefaultItem(
		"Meta Description",
		metaDescription(),
		"Congratulations! Your page is using a description tag",
		"Your page is not using a description tag")
	);
	// Robots.txt
	panel.append(generateDefaultItem(
		"Robots.txt",
		robots(),
		"Congratulations! Your website uses a \"robots.txt\" file",
		"Your website is not using a \"robots.txt\" file")
	);
	// Sitemap.xml
	panel.append(generateDefaultItem(
		"Sitemap.xml",
		sitemap(),
		"Congratulations! Your website is using a \"sitemap.xml\" file",
		"Your website is not using a \"sitemap.xml\" file")
	);

	imageAlt();
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
	close.innerText			= "X";
	close.onclick			= closePanel;

	header.append(title);
	header.append(close);
	panel.append(header);

	shrinkBody();
	document.body.appendChild(panel);
}

if (!document.getElementById("arkalytics-panel")) {
	createPanel();
} else {
	shrinkBody();
	let panel = document.getElementById("arkalytics-panel");
	document.body.appendChild(panel);
	panel.style.right	= "0px";
}

analyze();