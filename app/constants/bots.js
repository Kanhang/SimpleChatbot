export const BASEURL =  "https://openrouter.ai/api/v1";
export const MODEL = "arcee-ai/trinity-mini:free";



export const getModel = (model) => {
    switch(model) {
        case 'arcee':
            return "arcee-ai/trinity-mini:free";
        case 'deepseek':
            return "deepseek/deepseek-r1-0528:free";
        case 'random':
            return "openrouter/free";
        case 'venice':
            return "cognitivecomputations/dolphin-mistral-24b-venice-edition:free";
        default:
            return "arcee-ai/trinity-mini:free";
        }
}
