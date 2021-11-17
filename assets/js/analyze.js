function wordCount(words) {
	var count = 0;
	for (var i = 0; i < words.length; i++) {
		count += words[i].textContent.split(" ").length
	}
	return count;
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
	return true
}

function sitemap() {
	return true
}

function imageAlt() {
	return true
}

function favicon() {
	return true	
}

function analyze() {
	// const h1			= document.getElementsByTagName("h1");
	// const word_count	= document.body.innerText.split(" ").length;

	// const h1_count	= h1.length;
	return {
		metaTitle: metaTitle(),
		metaDescription: metaDescription(),
		headingTags: headingTags()
	};
}

analyze();