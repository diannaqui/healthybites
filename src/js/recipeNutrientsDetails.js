export default class RecipeNutrients {
    constructor(dataSource, idSelected) {
        this.dataSource = dataSource;
        this.idSelected = idSelected;
    }

    async init() {
        // div father RecipeDetails
        const divRecipeDetails = document.createElement('div');
        divRecipeDetails.classList.add('pageDetails');

            const generalInfo = await this.dataSource.getRecipeByIdInformation(this.idSelected);

            const containerInfo = document.createElement('div');
            containerInfo.classList.add('containerInfoGeneral');
                // Title
                const titleRecipe = document.createElement('h1');
                titleRecipe.classList.add('titleRecipe');
                titleRecipe.textContent = generalInfo.title;
            containerInfo.appendChild(titleRecipe);

                // Image 
                const imageRecipe = document.createElement('img');
                imageRecipe.classList.add('imageRecipe');
                imageRecipe.src = generalInfo.image;
            containerInfo.appendChild(imageRecipe);      

        divRecipeDetails.appendChild(containerInfo);


        const listRecipeDetails = await this.dataSource.getRecipeById(this.idSelected);

        if (listRecipeDetails) {
            const generalDiv = document.createElement('div');
            generalDiv.classList.add("generalDivNut");

            //container for ul element
            const nutrientsUlContainer = document.createElement('div');
            nutrientsUlContainer.classList.add('ContainerForUl')
            // list of good nutrients per recipe
            const titleGoodNutrition = document.createElement('h2');
            titleGoodNutrition.classList.add("titleNutrients");
            titleGoodNutrition.textContent = "Good Nutrition";
            const good = this.renderTemplateList(listRecipeDetails.good, "goodNutrients");

            nutrientsUlContainer.appendChild(titleGoodNutrition);
            nutrientsUlContainer.appendChild(good);
            generalDiv.appendChild(nutrientsUlContainer);

            // list of bad nutrients per recipe
            const nutrientsUlContainerbad = document.createElement('div');
            nutrientsUlContainerbad.classList.add('ContainerForUlBadNutrients')
            const titleBadNutrients = document.createElement('h2');
            titleBadNutrients.classList.add("titleNutrients");
            titleBadNutrients.textContent = "Be aware of...";
            const bad = this.renderTemplateList(listRecipeDetails.bad, "badNutrients");
            
            nutrientsUlContainerbad.appendChild(titleBadNutrients);
            nutrientsUlContainerbad.appendChild(bad);
            generalDiv.appendChild(nutrientsUlContainerbad);
            
            divRecipeDetails.appendChild(generalDiv);
        } 

        return divRecipeDetails;
    }


    renderTemplateList(list, className) {
        
        const ul = document.createElement('ul');
        ul.classList.add(className)
        let colorNumber = 0;
        list.forEach(item => {
            if(colorNumber < 6) {        
                colorNumber++;
                const li = document.createElement('li');
                li.classList.add('color' + colorNumber, 'nutrient');
                const pAmount = document.createElement('p');
                const pDaily = document.createElement('p');
                pAmount.textContent = `${item.title}: ${item.amount}`;
                pDaily.textContent = `Daily needs: ${item.percentOfDailyNeeds}`;
                li.appendChild(pAmount);
                li.appendChild(pDaily);
                ul.appendChild(li);
            }
        })
        return ul
    }
}
