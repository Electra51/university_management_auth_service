import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  //findLastUserId ei function diye database theke lastUserId k findOne diye khuje anbo jarjonno descending order a sort korbo createdAt er upore. amader sudhu id lagbe tai document na niye lean() diye pure javascript object nibo. id:1 mane shudhu id property nibo, _id:0 man mongoose a nijosso _id chai na.
  return lastUser?.id
  //kaj sese last id return korbe tai return a eta.
}
export const generatedUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  // padStart(5,0) mane total digit hobe 5 & bamergulo 0 diye fillup thakbe
  // currentId ta jodi first hoy tahole toString(),padstart() diye baniye nibe na hy database theke niye asbe
  return incrementedId
}
