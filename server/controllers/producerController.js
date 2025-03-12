const Producer = require('../models/Producer');

exports.getAllProducers = async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProducer = async (req, res) => {
  try {
    const producer = new Producer(req.body);
    await producer.save();
    res.json(producer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducer = async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer) return res.status(404).json({ error: 'Producer not found' });
    res.json(producer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProducer = async (req, res) => {
  try {
    const producer = await Producer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producer) return res.status(404).json({ error: 'Producer not found' });
    res.json(producer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProducer = async (req, res) => {
  try {
    const producer = await Producer.findByIdAndDelete(req.params.id);
    if (!producer) return res.status(404).json({ error: 'Producer not found' });
    res.json({ message: 'Producer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
