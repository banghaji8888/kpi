module.exports = (sequalize,DataTypes) => {
    const Group = sequalize.define('groups',{
        name: DataTypes.STRING(50)
    })

    return Group;
}