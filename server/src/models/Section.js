module.exports = (sequalize,DataTypes) => {
    const Section = sequalize.define('sections',{
        name: DataTypes.STRING(100)
    });

    return Section;
}