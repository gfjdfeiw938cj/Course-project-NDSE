import { AdvertisementModel } from '../model/Advertisement.js';

export class AdvertisementModule {
  async find(params) {
    const searchParams = {
      isDeleted: false,
    };
    if (params) {
      const { shortText, description, userId, tags } = params;

      if (shortText) {
        searchParams.shortText = { $regex: shortText, $options: 'i' };
      }
      if (description) {
        searchParams.description = { $regex: description, $options: 'i' };
      }
      if (userId) {
        searchParams.user = userId;
      }
      if (tags) {
        searchParams.tags = tags;
      }
    }

    console.log(searchParams);

    const advertisements = await AdvertisementModel.find(searchParams);

    return advertisements;
  }

  async findById(id) {
    return await AdvertisementModel.findById(id);
  }

  async create(data) {
    try {
      const newAdvertisement = new AdvertisementModel(data);

      return await newAdvertisement.save();
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id) {
    
    const advertisement = await AdvertisementModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isDeleted: true,
        },
      }
    ).catch((err) => {
      console.log('err', err);
    });

    console.log(advertisement);
    return advertisement;
  }
}
