# Summary

Meal planner should be stored in JSON with the following key-value pairs. These value types are derived from
[schema.org/DayOfWeek](https://schema.org/DayOfWeek).
Helpful link in meal planner is [here](https://github.com/schemaorg/schemaorg/issues/1457)
- `day - DayOfWeek`
    - What day of the week it is
    - Required: YES
- `date - Date`
    - Corresponding date
    - Required: YES
- `meals - String`
    - Corresponding meals on that day
    - Required: YES

