import joi from 'joi';

function newRecommendation(recommendation) {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required(),
        youtubeLink: joi.string().pattern(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/).required(),
    });
    return !(schema.validate(recommendation)).error;
}

function newVote({ id, vote }) {
    const schema = joi.object({
        id: joi.number().min(0).required(),
    });
    const isIdValid = !(schema.validate({ id })).error;
    const isVoteValid = ['upvote', 'downvote'].includes(vote.toLowerCase());

    return isIdValid && isVoteValid;
}

export {
    newRecommendation,
    newVote,
};
