import { prisma } from "@server/lib/prisma";
import settings from "./settings.json";

const PASSWORD_HASH = await Bun.password.hash("password123456");

async function seed() {
  try {
    console.log("Starting database seed...");

    // Clean up all related tables in the correct order
    console.log("Cleaning up database...");
    await prisma.$transaction([
      prisma.attendee.deleteMany(),
      prisma.teamMember.deleteMany(),
      prisma.project.deleteMany(),
      prisma.student.deleteMany(),
      prisma.attendeeType.deleteMany(),
      prisma.settings.deleteMany(),
      prisma.admin.deleteMany(),
      prisma.user.deleteMany(),
    ]);

    // Create admin with settings
    console.log("Creating admin...");
    const admin = await prisma.user.create({
      data: {
        id: "admin",
        passwordHash: PASSWORD_HASH,
        admin: {
          create: {
            settings: {
              create: {
                ...settings,
                venueName: settings.venueName,
                venueAddress: settings.venueAddress,
                eventEndTime: new Date(settings.eventEndTime),
                eventDescription: settings.eventDescription,
                capacityStatus: settings.capacityStatus,
                conferenceDateTime: new Date(settings.conferenceDateTime),
                projectSubmissionStart: new Date(
                  settings.projectSubmissionStart
                ),
                projectSubmissionEnd: new Date(settings.projectSubmissionEnd),
                seatReservationStart: new Date(settings.seatReservationStart),
                seatReservationEnd: new Date(settings.seatReservationEnd),
                attendeeTypes: {
                  create: settings.attendeeTypes.map((type) => ({
                    name: type.name,
                  })),
                },
              },
            },
          },
        },
      },
    });

    // Create students with projects
    console.log("Creating students...");
    const students = [
      {
        fullname: "John Doe",
        email: "john.doe@example.com",
        project: {
          title: "AI-Powered Learning Platform",
          description:
            "An intelligent platform that adapts to student learning styles",
          category: "Artificial Intelligence",
          techStack: "Python, TensorFlow, React, Node.js",
          teamName: "AI Innovators",
        },
      },
      {
        fullname: "Jane Smith",
        email: "jane.smith@example.com",
        project: {
          title: "Smart City Traffic Management",
          description: "Real-time traffic optimization using IoT sensors",
          category: "IoT & Smart Cities",
          techStack: "Java, Spring Boot, React Native, MongoDB",
          teamName: "Urban Tech",
        },
      },
      {
        fullname: "Alex Johnson",
        email: "alex.johnson@example.com",
        project: {
          title: "Blockchain Supply Chain",
          description: "Transparent and secure supply chain tracking",
          category: "Blockchain",
          techStack: "Solidity, Web3.js, Node.js, PostgreSQL",
          teamName: "Chain Masters",
        },
      },
      {
        fullname: "Sarah Williams",
        email: "sarah.williams@example.com",
        project: {
          title: "AR Educational Platform",
          description: "Interactive learning through augmented reality",
          category: "Augmented Reality",
          techStack: "Unity, C#, ARKit, Firebase",
          teamName: "AR Pioneers",
        },
      },
    ];

    for (const [index, student] of students.entries()) {
      const { fullname, email, project } = student;
      const passwordHash = await Bun.password.hash("password123456");
      const studentId = `CS2025${String(index + 1).padStart(3, "0")}`;

      await prisma.user.create({
        data: {
          id: studentId,
          passwordHash,
          student: {
            create: {
              fullname,
              email,
              project: {
                create: {
                  ...project,
                  members: {
                    create: [
                      {
                        id: studentId,
                        fullname,
                        email,
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      });
    }

    // Create attendees
    console.log("Creating attendees...");
    const attendees = [
      {
        fullname: "Dr. Michael Brown",
        email: "michael.brown@university.edu",
        phone: "+12345678901",
        department: "Computer Science",
        type: "Faculty",
      },
      {
        fullname: "Emily Davis",
        email: "emily.davis@techcorp.com",
        phone: "+12345678902",
        department: "Research & Development",
        type: "Industry Partners",
      },
      {
        fullname: "David Wilson",
        email: "david.wilson@university.edu",
        phone: "+12345678903",
        department: "Engineering",
        type: "Faculty",
      },
    ];

    for (const [index, attendee] of attendees.entries()) {
      const attendeeType = await prisma.attendeeType.findFirst({
        where: { name: attendee.type },
      });

      if (!attendeeType) {
        console.warn(
          `Attendee type ${attendee.type} not found, skipping attendee ${attendee.fullname}`
        );
        continue;
      }

      await prisma.attendee.create({
        data: {
          fullname: attendee.fullname,
          email: attendee.email,
          phone: attendee.phone,
          department: attendee.department,
          attendeeType: {
            connect: {
              id: attendeeType.id,
            },
          },
          attendStatus: "ACCEPTED",
          ticket: `GRAD2024-${String(index + 1).padStart(3, "0")}`,
        },
      });
    }

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error during seed:", error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("Seed script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
