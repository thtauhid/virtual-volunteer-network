import prisma from "@/lib/prisma";
import "@testing-library/jest-dom";

describe("Org", () => {
  beforeAll(() => {
    // sign in to clerk
  });
  test("View Opportunities", async () => {
    const opportunities = await prisma.opportunity.findMany();

    expect(opportunities).toBeTruthy();
  });

  test("Create Opportunity", async () => {
    const opportunity = await prisma.opportunity.create({
      data: {
        title: "Software Developer",
        details: "We are looking for a software developer to join our team",
        location: "Remote",
        start_date: new Date(),
        end_date: new Date(),
        views: 0,
        is_deleted: false,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: "user_2bDUWxWoh0rWzLZw7r8tVjJLWX4",
      },
    });

    expect(opportunity).toBeTruthy();
  });

  test("View Applications", async () => {
    const applications = await prisma.application.findMany();

    expect(applications).toBeTruthy();
  });

  test("View Single Application", async () => {
    const application = await prisma.application.findFirst({
      where: {
        id: 7,
      },
    });

    expect(application).toBeTruthy();
  });

  test("Create Workspace", async () => {
    const workspace = await prisma.workspace.create({
      data: {
        name: "Software Development",
        details: "A workspace for software developers",
        ownerId: "user_2bDUWxWoh0rWzLZw7r8tVjJLWX4",
      },
    });

    expect(workspace).toBeTruthy();
  });

  test("View Workspaces", async () => {
    const workspaces = await prisma.workspace.findMany();

    expect(workspaces).toBeTruthy();
  });

  test("View Single Workspace", async () => {
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: 5,
      },
    });

    expect(workspace).toBeTruthy();
  });

  test("Create Project", async () => {
    const project = await prisma.project.create({
      data: {
        name: "Software Development",
        details: "A project for software developers",
        ownerId: "user_2bDUWxWoh0rWzLZw7r8tVjJLWX4",
        workspaceId: 5,
      },
    });

    expect(project).toBeTruthy();
  });

  test("View Projects", async () => {
    const projects = await prisma.project.findMany();

    expect(projects).toBeTruthy();
  });

  test("View Single Project", async () => {
    const project = await prisma.project.findFirst({
      where: {
        id: 6,
      },
    });

    expect(project).toBeTruthy();
  });

  test("Create Task", async () => {
    const task = await prisma.projectTask.create({
      data: {
        name: "Software Development",
        details: "A task for software developers",
        projectId: 6,
      },
    });
  });

  test("View Tasks", async () => {
    const tasks = await prisma.projectTask.findMany();

    expect(tasks).toBeTruthy();
  });
});
