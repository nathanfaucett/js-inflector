var indexOf = require("index_of");


module.exports = Inflector;


function Inflector() {
    this.plurals = [];
    this.singulars = [];
    this.uncountables = [];
}

Inflector.create = function() {
    return new Inflector();
};

Inflector.prototype.clear = function() {

    this.plurals.length = 0;
    this.singulars.length = 0;
    this.uncountables.length = 0;

    return this;
};

Inflector.prototype.uncountable = function() {
    var uncountables = this.uncountables,
        i = -1,
        il = arguments.length - 1;

    while (i++ < il) {
        uncountables[uncountables.length] = arguments[i].toLowerCase();
    }
    return this;
};

Inflector.prototype.plural = function(rule, replacement) {
    var plurals = this.plurals;

    plurals[plurals.length] = [rule, replacement];
    return this;
};

Inflector.prototype.singular = function(rule, replacement) {
    var singulars = this.singulars;

    singulars[singulars.length] = [rule, replacement];
    return this;
};

Inflector.prototype.irregular = function(singular, plural) {

    singular = singular.toLowerCase();
    plural = plural.toLowerCase();

    this.plural(new RegExp("\\b" + singular + "\\b", "i"), plural);
    this.singular(new RegExp("\\b" + plural + "\\b", "i"), singular);

    return this;
};

Inflector.prototype.pluralize = function(word) {
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

Inflector.prototype.isPlural = function(word) {

    return this.singularize(word) !== word;
};

Inflector.prototype.is_plural = Inflector.prototype.isPlural;

Inflector.prototype.singularize = function(word) {
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

Inflector.prototype.isSingular = function(word) {

    return this.pluralize(word) !== word;
};

Inflector.prototype.is_singular = Inflector.prototype.isSingular;

function replace(word, rule, replacement) {
    if (rule.test(word)) {
        return word.replace(rule, replacement);
    } else {
        return false;
    }
}
