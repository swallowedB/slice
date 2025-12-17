import GoalSection from "@/app/(protected)/goals/[goalId]/_components/GoalSection";
import { EMPTY_MESSAGES } from "@/constants/messages";
import { render, screen } from "@testing-library/react";

describe("목표상세 Todo/done", () => {
  it("items가 Todo박스에 비어있으면 EmptyState를 보여준다", () => {
    render(
      <GoalSection
        title="TO DO"
        items={[]}
        onToggleChecked={jest.fn()}
      />,
    );
    expect(screen.getByText(EMPTY_MESSAGES.TODO.ALL)).toBeInTheDocument();
  });

  it("items가 Done박스에 비어있으면 EmptyState를 보여준다", () => {
    render(
      <GoalSection
        title="DONE"
        items={[]}
        onToggleChecked={jest.fn()}
      />,
    );
    expect(screen.getByText(EMPTY_MESSAGES.TODO.DONE)).toBeInTheDocument();
  });
});
