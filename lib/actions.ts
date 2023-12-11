// @ts-ignore
import { Orbis } from "@orbisclub/orbis-sdk";
import { useStore } from "./store/useStore";

const handleResponse = (res: any, action: string) => {
  if (res.status == 200) {
    return { success: true, doc: res.doc };
  } else {
    console.error(`Error ${action}: `, res);
    return { success: false, error: `Error ${action}.` };
  }
};

export const connectOrbis = async () => {
  const setOrbis = useStore.getState().setOrbis;
  const setUser = useStore.getState().setUser;
  const orbis = useStore.getState().orbis || new Orbis({});

  setOrbis(orbis);

  const res = await orbis.connect_v2({ chain: "ethereum", lit: false });

  if (res.status == 200) {
    setUser(res.did);
  } else {
    console.log("Error connecting to Ceramic: ", res);
    alert("Error connecting to Ceramic.");
  }
};

interface CreateOrbisContextProps {
  name: string;
  displayName: string;
  websiteUrl: string;
  project_id: string;
  parentContext: string;
}

export const createOrbisContext = async (options: CreateOrbisContextProps) => {
  const orbis = useStore.getState().orbis;

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const res = await orbis.createContext(options);
  return handleResponse(res, "creating Orbis context");
};

interface CreateOrbisPostProps {
  body: string;
  context: string;
}

export const createOrbisPost = async (options: CreateOrbisPostProps) => {
  const orbis = useStore.getState().orbis;

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const res = await orbis.createPost(options);
  return handleResponse(res, "creating Orbis post");
};

interface CreateOrbisCommentProps {
  body: string;
  master: string; // This is the stream id of the post.
}

export const createOrbisComment = async (options: CreateOrbisCommentProps) => {
  const orbis = useStore.getState().orbis;

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const res = await orbis.createPost(options);
  return handleResponse(res, "creating Orbis post");
};

interface CreateOrbisReplyProps {
  body: string;
  reply_to: string; // This is the stream id of the comment.
}

export const createOrbisReply = async (options: CreateOrbisReplyProps) => {
  const orbis = useStore.getState().orbis;

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const res = await orbis.createPost(options);
  return handleResponse(res, "creating Orbis post");
};

interface GetOrbisPostsProps {
  context: string;
  page?: number;
  limit?: number;
  ascending?: boolean;
}

export const getOrbisPosts = async (props: GetOrbisPostsProps) => {
  const orbis = useStore.getState().orbis || new Orbis({});

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const { data, error } = await orbis.getPosts(
    { only_master: true, context: props.context },
    props.page,
    props.limit,
    props.ascending,
  );

  if (error) {
    console.error("Error getting Orbis posts: ", error);
    return { success: false, error: "Error getting Orbis posts." };
  }

  return { success: true, data };
};

export const getOrbisPostComments = async (master: string) => {
  const orbis = useStore.getState().orbis || new Orbis({});

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const { data, error } = await orbis.getPosts({ master });
  if (error) {
    console.error("Error getting Orbis post comments: ", error);
    return { success: false, error: "Error getting Orbis post comments." };
  }
  return { success: true, data };
};

export const getOrbisCommentReplies = async (reply_to: string) => {
  const orbis = useStore.getState().orbis || new Orbis({});

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const { data, error } = await orbis.getPosts({ reply_to });
  if (error) {
    console.error("Error getting Orbis post comments: ", error);
    return { success: false, error: "Error getting Orbis post comments." };
  }
  return { success: true, data };
};

export const getOrbisProfile = async (did: string) => {
  const orbis = useStore.getState().orbis;

  if (!orbis) {
    console.error("Orbis is uninitialized");
    return { success: false, error: "Orbis is uninitialized" };
  }

  const { data, error } = await orbis.getProfile(did);
  if (error) {
    console.error("Error getting Orbis post comments: ", error);
    return { success: false, error: "Error getting Orbis post comments." };
  }
  return { success: true, data };
};
