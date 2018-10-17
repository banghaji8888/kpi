module.exports = (sequalize,DataTypes) => {
    const Positions = sequalize.define('positions',{
        name: DataTypes.STRING(100)
    });

    return Positions;
}