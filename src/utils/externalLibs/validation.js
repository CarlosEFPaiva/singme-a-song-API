import joi from 'joi';

function newRecommendation(recommendation) {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        youtubeLink: joi.string().pattern(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/).required(),
    });
    return !(schema.validate(recommendation)).error;
}

export {
    newRecommendation,
};
