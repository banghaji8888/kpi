module.exports = (sequalize,DataTypes) => {
    const JobDesk = sequalize.define('job_desks',{
        name: DataTypes.STRING(100),
        credit_number: DataTypes.DECIMAL(2,4),
        max_total: DataTypes.INTEGER(4)
    });

    return JobDesk;
}