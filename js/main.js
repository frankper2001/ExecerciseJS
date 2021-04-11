const categories = [
	{
		name: 'category1',
		subcategories: [
			{
				name: 'category2',
				subcategories: [],
			},
			{
				name: 'category3',
				subcategories: [
					{
						name: 'category4',
						subcategories: [],
					},
				],
			},
		],
	},
	{
		name: 'category5',
		subcategories: [],
	},
];

const buildPath = (foundCategory) => {
	let path = '';
	if (foundCategory.parents.length !== 0) {
		foundCategory.parents.unshift('');
		path = foundCategory.parents.join('/');
		console.log(`${path}/${foundCategory.category}`);
	} else {
		console.log(`/${foundCategory.category}`);
	}
};

const findCategoryByName = (category, categoryName, parents) => {
	if (category.name === categoryName) {
		return {
			category: category.name,
			parents: parents,
		};
	}
	if (
		category.hasOwnProperty('subcategories') &&
		category.subcategories.length > 0
	) {
		parents.push(category.name);
		for (let i in category.subcategories) {
			const subCategory = category.subcategories[i];
			if (subCategory.hasOwnProperty('name')) {
				const foundCategory = findCategoryByName(
					subCategory,
					categoryName,
					parents
				);
				if (foundCategory !== null) {
					return foundCategory;
				}
			}
		}
	}
	return null;
};

const getCategoryPath = (categories, categoryName) => {
	let foundCategory = null;
	categories.forEach((category) => {
		let object = findCategoryByName(category, categoryName, []);
		if (object !== null) {
			foundCategory = object;
		}
	});
	if (foundCategory !== null) {
		return buildPath(foundCategory);
	} else {
		console.log('/');
	}
};

// OUTPUT SAMPLES
//console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
//console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
//console.log(getCategoryPath(categories, 'category5')); // should output: '/category5'
