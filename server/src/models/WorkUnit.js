module.exports = (sequalize,DataTypes) => {
    const WorkUnit = sequalize.define('work_units',{
        name: DataTypes.STRING(100)
    });

    return WorkUnit;
}