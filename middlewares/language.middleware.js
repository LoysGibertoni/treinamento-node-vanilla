module.exports = (req, res, next) => {
    const acceptLanguage = req.headers["accept-language"];

    if (acceptLanguage) {
        const languages = acceptLanguage.split(',')
            .map(languageString => {
                const splitLanguageString = languageString.split(';');
                const locale = splitLanguageString.shift();
                let qualityString = splitLanguageString.shift();
                if (qualityString) {
                    qualityString = qualityString.split('=')[1];
                }
                const quality = Number.parseFloat(qualityString) || 1;
                return { locale, quality };
            })
            .sort((lhs, rhs) => rhs.quality - lhs.quality);

        for (const language of languages) {
            req.strings = require(`../resources/strings/${language.locale}`);
            if (req.strings) {
                return next();
            }
        }
    }

    req.strings = require('../resources/strings/pt-BR');
    return next();
};