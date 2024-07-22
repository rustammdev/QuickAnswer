// const result = await TournamentModel.findByIdAndUpdate(id, { $push: { participants: playerId } }, { new: true });
// if (!result) {
//     return { code: 409, type: 'fail', message: "Failed to update the tournament" };
// }
// return { status: "ok", code: 200, message: "Player added successfully.", tournament: result };