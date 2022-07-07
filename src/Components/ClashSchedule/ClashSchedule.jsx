import classes from "./ClashSchedule.module.css"


const ClashSchedule = (props) => {
  const scheduleData = [
    {
      id: 4344,
      themeId: 19,
      nameKey: "zaun",
      nameKeySecondary: "day_2",
      schedule: [
        {
          id: 4524,
          registrationTime: 1659914100000,
          startTime: 1659924000000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4381,
      themeId: 13,
      nameKey: "shadow_isles",
      nameKeySecondary: "day_1",
      schedule: [
        {
          id: 4561,
          registrationTime: 1657408500000,
          startTime: 1657418400000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4382,
      themeId: 19,
      nameKey: "zaun",
      nameKeySecondary: "day_3",
      schedule: [
        {
          id: 4562,
          registrationTime: 1661037300000,
          startTime: 1661047200000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4324,
      themeId: 19,
      nameKey: "zaun",
      nameKeySecondary: "day_1",
      schedule: [
        {
          id: 4504,
          registrationTime: 1659827700000,
          startTime: 1659837600000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4401,
      themeId: 13,
      nameKey: "shadow_isles",
      nameKeySecondary: "day_2",
      schedule: [
        {
          id: 4581,
          registrationTime: 1657494900000,
          startTime: 1657504800000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4421,
      themeId: 13,
      nameKey: "shadow_isles",
      nameKeySecondary: "day_3",
      schedule: [
        {
          id: 4601,
          registrationTime: 1658618100000,
          startTime: 1658628000000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4325,
      themeId: 19,
      nameKey: "zaun",
      nameKeySecondary: "day_4",
      schedule: [
        {
          id: 4505,
          registrationTime: 1661123700000,
          startTime: 1661133600000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4403,
      themeId: 10,
      nameKey: "noxus",
      nameKeySecondary: "day_4",
      schedule: [
        {
          id: 4583,
          registrationTime: 1663542900000,
          startTime: 1663552800000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4422,
      themeId: 10,
      nameKey: "noxus",
      nameKeySecondary: "day_2",
      schedule: [
        {
          id: 4602,
          registrationTime: 1662333300000,
          startTime: 1662343200000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4402,
      themeId: 13,
      nameKey: "shadow_isles",
      nameKeySecondary: "day_4",
      schedule: [
        {
          id: 4582,
          registrationTime: 1658704500000,
          startTime: 1658714400000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4283,
      themeId: 10,
      nameKey: "noxus",
      nameKeySecondary: "day_3",
      schedule: [
        {
          id: 4463,
          registrationTime: 1663456500000,
          startTime: 1663466400000,
          cancelled: false,
        },
      ],
    },
    {
      id: 4383,
      themeId: 10,
      nameKey: "noxus",
      nameKeySecondary: "day_1",
      schedule: [
        {
          id: 4563,
          registrationTime: 1662246900000,
          startTime: 1662256800000,
          cancelled: false,
        },
      ],
    },
  ];

  const groupedScheduleData = scheduleData.reduce((grouped, item) => {
    const nameKey = item.nameKey
    if (grouped[nameKey] == null) {
      grouped[nameKey] = []
    }
    grouped[nameKey].push(item)
    return grouped
  }, {})
  console.log(groupedScheduleData);

  const getDate = (input) => {
    let date = new Date(input)
    return date.toDateString();
  }

  return (
    <div className={classes.clashSchedule} >
      {Object.keys(groupedScheduleData).map((val) =>
      (
        <div className={classes.clashScheduleList}>
          <div> {val} </div>
          <ul className>{groupedScheduleData[val].map((val, i) =>
          (
            <li key={i}>
              {val.nameKeySecondary}
            </li>
          ))}
          </ul>
          <ul> {groupedScheduleData[val].map((val, i) =>
          (
            <li key={i}>
              {getDate(val.schedule[0].startTime)}
            </li>
          ))} </ul>

        </div>

      )
      )}
      { }
    </div>
  );
};

export default ClashSchedule;
