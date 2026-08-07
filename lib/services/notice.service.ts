import Notice from "@/lib/models/Notice";
import { connectToDB } from "@/lib/connectToDB";
import { NoticeInput } from "@/lib/validations/notice.validation";

export async function createNotice(data: NoticeInput) {
  await connectToDB();

  return await Notice.create(data);
}

export async function getAllNotices() {
  await connectToDB();

  return await Notice.find()
    .sort({
      order: 1,
      createdAt: -1,
    })
    .lean();
}

export async function getPublishedNotices() {
  await connectToDB();

  return await Notice.find({
    isPublished: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .lean();
}

export async function getNoticeById(id: string) {
  await connectToDB();

  return await Notice.findById(id).lean();
}

export async function updateNotice(
  id: string,
  data: Partial<NoticeInput>
) {
  await connectToDB();

  return await Notice.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteNotice(id: string) {
  await connectToDB();

  return await Notice.findByIdAndDelete(id);
}