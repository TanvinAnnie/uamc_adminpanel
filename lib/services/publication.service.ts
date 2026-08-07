import Publication from "@/lib/models/Publication";
import { connectToDB } from "@/lib/connectToDB";
import { PublicationInput } from "@/lib/validations/publication.validation";

export async function createPublication(
  data: PublicationInput
) {
  await connectToDB();

  return await Publication.create(data);
}

export async function getAllPublications() {
  await connectToDB();

  return await Publication.find()
    .sort({
      order: 1,
      createdAt: -1,
    })
    .lean();
}

export async function getPublishedPublications() {
  await connectToDB();

  return await Publication.find({
    isPublished: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .lean();
}

export async function getPublicationById(id: string) {
  await connectToDB();

  return await Publication.findById(id).lean();
}

export async function updatePublication(
  id: string,
  data: Partial<PublicationInput>
) {
  await connectToDB();

  return await Publication.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deletePublication(id: string) {
  await connectToDB();

  return await Publication.findByIdAndDelete(id);
}