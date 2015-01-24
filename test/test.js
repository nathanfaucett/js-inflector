var assert = require("assert"),
    Inflector = require("../src/index");


describe("Inflector", function() {
    it("should pluralize/singularize based on defined rules", function() {
        var inflector = new Inflector();

        inflector.plural(/$/, "s");
        inflector.plural(/(ch|sh|ss|[sxz])$/i, "$1es");
        inflector.plural(/([^aeiouy])y$/i, "$1ies");

        inflector.singular(/s$/i, "");
        inflector.singular(/(ch|sh|ss|[sxz])es$/i, "$1");
        inflector.singular(/([^aeiouy])ies$/i, "$1y");

        inflector.irregular("child", "children");
        inflector.irregular("person", "people");
        inflector.irregular("self", "selves");
        inflector.irregular("man", "men");
        inflector.irregular("woman", "women");

        inflector.uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "jeans", "police");

        assert.equal(inflector.pluralize("box"), "boxes");
        assert.equal(inflector.pluralize("sky"), "skies");
        assert.equal(inflector.pluralize("bucket"), "buckets");
        assert.equal(inflector.pluralize("rice"), "rice");

        assert.equal(inflector.singularize("boxes"), "box");
        assert.equal(inflector.singularize("skies"), "sky");
        assert.equal(inflector.singularize("buckets"), "bucket");
        assert.equal(inflector.singularize("rice"), "rice");
    });
});
