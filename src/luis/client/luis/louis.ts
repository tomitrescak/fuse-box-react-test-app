
import { Story } from './state/story';
import { state } from './state/state';

export class StoryGroup {
  name: string;
  storyGroups?: StoryGroup[];
  stories: Story[];
  parent: StoryGroup;

  private _decorator?: any;

  constructor(name: string, parent?: StoryGroup) {
    this.stories = [];
    this.storyGroups = [];
    this.name = name;
    this.parent = parent;
  }

  get root() {
    let parent: StoryGroup = this;
    while (parent.parent != null) { parent = parent.parent; }
    return parent;
  }

  get decorator() {
    if (this._decorator) {
      return this._decorator;
    }
    if (this.parent) {
      return this.parent.decorator;
    }
    return null;
  }

  set decorator(dec: any) {
    this._decorator = dec;
  }

  add(storyName: string, component: Function) {
    return this.addWithInfo(storyName, null, component);
  }

  addFolder(folderName: string) {
    if (!this.storyGroups) { this.storyGroups = []; }
    const folder = new StoryGroup(folderName, this);
    this.storyGroups.push(folder);
    return folder;
  }

  addWithInfo(storyName: string, info: string, component: Function) {
    const story = new Story(storyName, info, component, this.decorator);

    this.stories.push(story);
    return this;
  }

  addDecorator(decorator: any) {
    this._decorator = decorator;
    return this;
  }

  addGroup(group: StoryGroup) {
    this.storyGroups.push(group);
    this.storyGroups.sort((a, b) => a.name < b.name ? -1 : 1);
  }
}

let parentGroup: StoryGroup = new StoryGroup('List of UIS');
let currentGroup: StoryGroup = parentGroup;
let currentStory: Story;


///////////////////////////////
// new functionality

export function describe(storyName) {

  // add to stories
  let storyGroup = currentGroup.storyGroups.find(s => s.name === storyName);

  if (!storyGroup) {
    storyGroup = new StoryGroup(storyName, currentGroup);
    currentGroup.addGroup(storyGroup);
  }
  currentGroup = storyGroup;
  currentGroup = currentGroup.parent;
  // currentGroup.storyGroups.sort((a, b) => a.name < b.name ? -1 : 1);
};

export function story(storyName: string, info: string | Function, component?: Function) {
  const story = new Story(
    storyName,
    component != null ? info as string : '',
    component != null ? component : info as Function,
    currentGroup.decorator);
  currentStory = story;
  currentGroup.stories.push(story);

  const runGroup = currentGroup;
}

export function decorator(decorator: any) {
  currentGroup.decorator = decorator;
}

export function changeStory(story: Story) {
  state.viewedStory = story;
}

export function stories(state: { runningTests: boolean }) {
  if (!state.runningTests) {
    // setTimeout
  }
  return parentGroup;
}





