var indexOf = require("index_of");


var InflectorPrototype;


module.exports = Inflector;


function Inflector() {
    this.plurals = [];
    this.singulars = [];
    this.uncountables = [];
}

InflectorPrototype = Inflector.prototype;

Inflector.create = function() {
    return new Inflector();
};

InflectorPrototype.clear = function() {

    this.plurals.length = 0;
    this.singulars.length = 0;
    this.uncountables.length = 0;

    return this;
};

InflectorPrototype.uncountable = function() {
    var uncountables = this.uncountables,
        i = -1,
        il = arguments.length - 1;

    while (i++ < il) {
        uncountables[uncountables.length] = arguments[i].toLowerCase();
    }
    return this;
};

InflectorPrototype.plural = function(rule, replacement) {
    var plurals = this.plurals;

    plurals[plurals.length] = [rule, replacement];
    return this;
};

InflectorPrototype.singular = function(rule, replacement) {
    var singulars = this.singulars;

    singulars[singulars.length] = [rule, replacement];
    return this;
};

InflectorPrototype.irregular = function(singular, plural) {

    singular = singular.toLowerCase();
    plural = plural.toLowerCase();

    this.plural(new RegExp("\\b" + singular + "\\b", "i"), plural);
    this.singular(new RegExp("\\b" + plural + "\\b", "i"), singular);

    return this;
};

InflectorPrototype.pluralize = function(word) {
    var plurals = this.plurals,
        result = word,
        i = plurals.length,
        pattern;

    if (indexOf(this.uncountables, word.toLowerCase()) !== -1) {
        return word;
    }

    while (i--) {
        pattern = plurals[i];

        if ((result = replace(word, pattern[0], pattern[1]))) {
            return result;
        }
    }

    return word;
};

InflectorPrototype.isPlural = function(word) {

    return this.singularize(word) !== word;
};

InflectorPrototype.is_plural = InflectorPrototype.isPlural;

InflectorPrototype.singularize = function(word) {
    var singulars = this.singulars,
        result = word,
        i = singulars.length,
        pattern;

    if (indexOf(this.uncountables, word.toLowerCase()) !== -1) {
        return word;
    }

    while (i--) {
        pattern = singulars[i];

        if ((result = replace(word, pattern[0], pattern[1]))) {
            return result;
        }
    }

    return word;
};

InflectorPrototype.isSingular = function(word) {

    return this.pluralize(word) !== word;
};

InflectorPrototype.is_singular = InflectorPrototype.isSingular;

function replace(word, rule, replacement) {
    if (rule.test(word)) {
        return word.replace(rule, replacement);
    } else {
        return false;
    }
}
