import prisma from "../prismaClient.js";

// GET all gadgets

const successProbability = () => {
  return Math.floor(Math.random() * 51) + 50;
};
 
const getAllGadgets = async (req, res) => {
  try {

      const { status } = req.query;

      const whereClause = status ? { status } : {};

      const gadgets = await prisma.gadget.findMany({
        where: whereClause,
      });

      const updatedGadgets = gadgets.map(gadget => ({
          ...gadget,
          mission_success_probability: `${successProbability()}%`
      }));

      res.json(updatedGadgets);
    } 
    catch (error){
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// POST new gadget
const addGadget = async (req, res) => {
  try {
    const { name, status } = req.body;
    const gadget = await prisma.gadget.create({
      data: { name, status: status || "AVAILABLE" },
    });
    res.status(201).json({ message: "Gadget added successfully", gadget });
  } catch (error) {
    res.status(500).json({ error: "Error adding gadget" });
  }
};

// PATCH update gadget status
const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, name } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (name) updateData.name = name;

    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    const gadget = await prisma.gadget.update({
      where: { id },
      data: updateData,
    });
    res.json(gadget);

  } catch (error) {
    res.status(500).json({ error: "Error updating gadget" });
  }
};

// DELETE (Decommission) a gadget
const decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await prisma.gadget.update({
      where: { id },
      data: { status: "DECOMMISSIONED", decommissionedAt: new Date() },
    });
    res.json({ message: "Gadget decommissioned", gadget });
  } catch (error) {
    res.status(500).json({ error: "Error decommissioning gadget" });
  }
};


const selfDestructGadget = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the gadget exists
    const gadget = await prisma.gadget.findUnique({
      where: { id },
    });

    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }

    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    console.log("Gadget ID:", id);
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        status: "Destroyed",
      },
    });

    res.json({
      // message: `Self-destruct sequence initiated for ${updatedGadget.name}.`,
      confirmation_code: confirmationCode,
      // gadget: updatedGadget,
    });
  } catch (error) {
    res.status(500).json({ error: "Error triggering self-destruct sequence" });
  }
};

export { getAllGadgets, addGadget, updateGadget, decommissionGadget, selfDestructGadget };
