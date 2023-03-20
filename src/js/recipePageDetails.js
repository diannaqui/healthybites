

export default class RecipeDetails {
    constructor(dataSource, idSelected) {
        this.dataSource = dataSource;
        this.idSelected = idSelected;
    }

    async init() {
        
        // div father RecipeDetails
        const divRecipeDetails = document.createElement('div');
        divRecipeDetails.classList.add('pageDetails');

        const listRecipeDetails = await this.dataSource.getRecipeById(this.idSelected);
        console.log(listRecipeDetails);

        if (listRecipeDetails) {

            // list of good nutrients per recipe
            const titleGoodNutrition = document.createElement('h2');
            titleGoodNutrition.classList.add("titleNutrients");
            titleGoodNutrition.textContent = "Good nutrition";
            const good = this.renderTemplateList(listRecipeDetails.good, "goodNutrients");

            divRecipeDetails.appendChild(titleGoodNutrition);
            divRecipeDetails.appendChild(good);

            // list of bad nutrients per recipe
            const titleBadNutrients = document.createElement('h2');
            titleBadNutrients.classList.add("titleNutrients");
            titleBadNutrients.textContent = "Be careful with...";
            const bad = this.renderTemplateList(listRecipeDetails.bad, "badNutrients");
            
            divRecipeDetails.appendChild(titleBadNutrients);
            divRecipeDetails.appendChild(bad);
        } 

        return divRecipeDetails;
    }


    renderTemplateList(list, className) {
        
        const ul = document.createElement('ul');
        ul.classList.add(className)

        list.forEach(item => {
            const li = document.createElement('li');
            const pAmount = document.createElement('p');
            const pDaily = document.createElement('p');
            pAmount.textContent = `${item.title}: ${item.amount}`;
            pDaily.textContent = `Daily needs: ${item.percentOfDailyNeeds}`;
            li.appendChild(pAmount);
            li.appendChild(pDaily);
            ul.appendChild(li);
        })
    
        return ul
 
    
    }
}