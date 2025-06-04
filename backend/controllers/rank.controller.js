import { Rank } from "../models/rank.model.js";
import { User } from "../models/user.model.js";

export const calculateRank = async (req, res) => {
  try {
    const userId = req.id;
    const usersRank = await Rank.findOne({ userDetails: userId });

    if (!usersRank) {
      return res.status(404).json({
        message: "Rank of this user cannot be calculated",
        success: false,
      });
    }

    const safeDivide = (num, denom, multiplier = 1) =>
      denom && denom !== 0 ? (num / denom) * multiplier : 0;

    const reviewScore = safeDivide(usersRank.clientRating.totalRating, usersRank.clientRating.totalReviews, 5);
    const accuracyScore = safeDivide(usersRank.timeAccuracy.accuracyScore, usersRank.timeAccuracy.totalDeliveries);
    let rehireScore = safeDivide(usersRank.rehireRate.sameClient, usersRank.rehireRate.totalWork, 4);
    if (rehireScore > 10) rehireScore = 10;

    const subjectScore = usersRank.subjectKnowledge;
    const quizScore = safeDivide(usersRank.freelanceQuiz.quizScore, usersRank.freelanceQuiz.totalQuiz, 0.5);
    const experienceScore = usersRank.experience * 0.5;
    const responseScore = safeDivide(usersRank.responseTime.totalScore, usersRank.responseTime.totalWork, 0.5);
    const conversionScore = safeDivide(usersRank.conversionRate.acceptedProposals, usersRank.conversionRate.totalProposals, 1);
    const uspScore = safeDivide(usersRank.uspClearity.uspRelated, usersRank.uspClearity.totalWorkDone, 0.5);
    const profileScore = usersRank.profileCompletion;
    const plagScore = usersRank.plaigFreeContent * 0.5;
    const loyalityScore = usersRank.platformLoyality * 0.5;

    const rank =
      reviewScore +
      accuracyScore +
      rehireScore +
      subjectScore +
      quizScore +
      experienceScore +
      responseScore +
      conversionScore +
      uspScore +
      profileScore +
      plagScore +
      loyalityScore;

      usersRank.rank = rank;
      usersRank.save()
      await User.findByIdAndUpdate(userId,{rank : rank})

    return res.status(200).json({
      message: "Rank calculated successfully",
      success: true,
      rank,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
