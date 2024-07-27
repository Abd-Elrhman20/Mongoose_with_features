import { AppError, catchAsyncError } from '../../utils/error.js';
import { massageModel } from './../../database/models/massage.model.js';

export const getAllMassages = catchAsyncError(async (req, res) => {
    await massageModel.find()
        .then((massages) => {
            res.status(200).json({ message: "All massages", massages: massages });
        })
        .catch((error) => {
            throw new AppError("Error while fetching massages", 500)
        });
})

export const createMassage = catchAsyncError(async (req, res) => {
    await massageModel.create(req.body)
        .then((massage) => {
            res.status(200).json({ message: "Massage created", massage: massage });
        })
        .catch((error) => {
            throw new AppError("Error while creating massage", 500)
        });
})

export const deleteMassage = catchAsyncError(async (req, res) => {
    await massageModel.findOneAndDelete({ _id: req.params.id })
        .then((massage) => {
            if (massage) {
                res.status(200).json({ message: "Massage deleted", deletedMassage: massage });
            }
            else {
                throw new AppError("Massage not found", 404)
            }
        })
        .catch((error) => {
            throw new AppError("Error while deleting massage", 500)
        });
})