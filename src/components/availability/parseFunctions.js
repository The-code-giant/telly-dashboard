import Parse from 'parse'

const DAY_MAP = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
}

export const getAvailability = async (sellerId) => {
  try {
    const Sellers = Parse.Object.extend('Sellers')
    const query = new Parse.Query(Sellers)
    query.equalTo('objectId', sellerId)
    const results = await query.first()

    const availability = results.get('availability')
    return availability
  } catch (error) {
    console.log(error)
  }
  return []
}
export const updateAvailability = async (sellerId, availability) => {
  try {
    const Sellers = Parse.Object.extend('Sellers')
    const query = new Parse.Query(Sellers)
    query.equalTo('objectId', sellerId)
    const results = await query.find()
    if (results.length === 0) {
      return
    }
    results.forEach((res) => {
      res.set('availability', availability)
      res.save()
    })
  } catch (error) {
    console.log(error)
  }
}

export const parseDay = (day, isSelected = false, startHours, endHours) => {
  return {
    day: DAY_MAP[day],
    empty: !isSelected,
    hours: isSelected
      ? [
          {
            start: startHours,
            end: endHours,
          },
        ]
      : [],
  }
}
