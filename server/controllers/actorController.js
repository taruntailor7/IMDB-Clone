const Actor = require('../models/Actor');

exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createActor = async (req, res) => {
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.json(actor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    res.json(actor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    res.json(actor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) return res.status(404).json({ error: 'Actor not found' });
    res.json({ message: 'Actor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
