---
date: 2023-01-11
title: Counterfactual Inference of Second Opinions
tags:
- paper
- machine learning 
description: A presentation 
lastUpdated: true
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---

> LastUpdated:2023-01-11 19:25

Do not be surprised if you subscribed 
to my RSS and see I write this article in English. 
This article is mainly for presentation, but I think everyone
who subscribed to my blog can read this presentation, so I put it on my blog.
Before you read this article, you can ask yourself two questions: 
What is the cause of an event and what is the result of an event? How to define it?
This is the basis of our decision-making, but do you know it exactly?
In fact, there is a research field called causal inference and I will give you 
some material to quickly learn the field.

There is one [article](https://zhuanlan.zhihu.com/p/33860572) that is very understandable 
and brief to give an introduction to causal inference. And I highly recommend anybody 
to read it, it may spend you about 20-30 minutes.
If you want to know something more detailed,
there are [a set of articles](https://www.zhihu.com/column/c_1217887302124773376) 
that you will take 2-3 hours to read.
And there is a [book](https://www.semanticscholar.org/paper/Causal-Inference-in-Statistics%3A-A-Primer-Pearl-Glymour/71e7a901efa84609eccd74876dab3ba30052d165)
written by Pearl, you can see the set of articles as a brief version of this book.

So if you don't want to know the details of the [paper](https://arxiv.org/abs/2203.08653), you can close this article and 
do what you love to do, the following content is about the paper I will present. 
I write this article based on my ppt. If you can't see the pictures, maybe your internet condition is **special**,
I have no idea, but there are some ways that may help and I wrote them 
on the About of this website.

## Some examples of counterfactual inference  

In my opinion, it is necessary to know how to make academic achievements
applicable, so I will give some examples to explain the application scenarios
of this paper.

Imagining a scenario that one person got COVID-19 and took medicine 
for three days and recovered. He learned from the internet that there is no specific 
medicine for COVID-19, patients can only rely on their immunity to defeat the virus.
So, he thinks that it is no need to take medicine for money saving. The truth is that he doesn't know 
what will happen if he didn't take medicine, 
he only knows he took medicine and recovered after three days.
This is an example of counterfactual inference, 
the fact that he didn't take medicine is an unreal event, and he tends to predict 
the result from events that didn't occur, maybe he will recover after one week, 
but who knows the result?

There are two extreme examples. For better resource allocation, a patient won't need to go to another hospital 
if he got medical advice, but if the government had consulted an economist, 
is it necessary to consult other economists? Former America president Reagan once joked that 
if the game Trivial Pursuit were designed for economists, it would 
have 100 questions and 3,000 answers. In these situations, Counterfactual Inference can give references for the decision maker.

## More details about the counterfactual inference

So, let's use mathematical language to describe it. Before we describe the counterfactual inference,
it is necessary to know some knowledge about causal inference.

> I don't know better ways to show a graph on the website, the [mermaid](https://mermaid.js.org/) 
which I used to use is less flexible(but more convenient) and it doesn't support Tex. So I use [Tikz](https://tikz.dev/) to make the pictures, but they look ugly in dark mode, if you 
know better tools, please let me know.

![figure 1](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-09_12-07.png)

See the picture above, this is a simple structural causal model, while we can express it as follow 
$$
Z = f_z(U_z),
X = f_x(U_x, Z),
Y = f_y(U_y, X)
$$

$U = \{U_y, U_z, U_x \}$ are jointly independent noise random variables, $Z$ is the direct cause of $X$
and $X$ is the direct cause of $Y$. $F=\{f_x,f_y,f_x\}$ are deterministic causal mechanisms.

Since $U$ is a set of random variables, we can use $P(U)$ to denote U's distribution. So, look at this 
picture, $U$ is the only source of stochasticity. If we use $\mathcal{M}$ to denote this model, we can 
use $P^\mathcal{M}$ to denote the distribution entailed by $\mathcal{M}$.
We use $\mathcal{X}=\{X, Y, Z\}$ to denote the random variables. 

<!-- ![figure 1](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-09_13-19.png) -->
![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-19_18-30.png)

Then, look at this picture, there is an intervention $\mathcal{I}$ assign $x_0$ to X,
the path between $Z$ and $X$ and the path between $U_x$ and $X$ has been cut off, $Z$ is a cause of $X$, but we now know that 
$X=x_0$, so no matter what $Z$ is, it does not affect $X$.We use $\mathcal{I} = \text{do} [X = x_0]$ 
to describe it. 

Then, we should know the difference between intervention and observation. The observation 
is that we know now $X=x_0$, it doesn't affect the structure of the model, since $X=x_0$
is just an observation or, knowledge, $Z$ will still affect $X$. 

So, given a (partial)observation $\mathcal{X}_p =\{X=x_0, Z=z_0\}$, the graph will look like this. 

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-09_14-07.png)

Then, there is an intervention $\mathcal{I} = \text{do} [Z=z_0]$, now the graph will look like this. 

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-09_14-10.png)

Now we can go on, given a SCM $\mathcal{M}$, now we have an intervention $\mathcal{I}$, and it will
change the structure of the model, so we describe the distribution by $P^{\mathcal{M}:\mathcal{I}}$.
Then, given the observation $\mathcal{X}=x$, the noise variables $U$ are distributed according to $P(U|\mathcal{X}=x)$.
So how can we know the above distribution? The answer varies from the actual problems.
There is a naive example that we all know Bayes formula:

$$
P(U|X) = \frac{P(U)P(X|U)}{P(X)}
$$

Now, we know $P(U)$, and $P(X|U)$ from $f_x(PA_x,U_x)$, and $P(X)$ from observation. Then, we will know $P(U|X)$.
Then, we can define a modified SCM $\mathcal{M}_{X=x}$.And if there is an intervention $\mathcal{I}$, we can describe the SCM $\mathcal{M}^\mathcal{I}_{X=x}$ 
as $\mathcal{P}^{\mathcal{M}|X=x:\mathcal{I}}$

The counterfactual statement can be viewed as an intervention, let's use the first example I described.


![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-09_15-31.png)

If the guy didn't take medicine, the intervention is $\mathcal{I}=\text{do}[M=0]$, and you can see the details in the picture above.

For arbitrary counterfactuals problems, there are three steps to solve them, 
you can see more details in this [book](https://www.semanticscholar.org/paper/Causal-Inference-in-Statistics%3A-A-Primer-Pearl-Glymour/71e7a901efa84609eccd74876dab3ba30052d165):

-  **Abduction**: Update $P(U)$ by the evidence to obtain $P(U|E = e)$.

-  **Action**: Modify the model, $M$, by removing the structural equations for the variables
in X and replacing them with the appropriate functions $X = x$, to obtain the modified
model, $M_x$.

-  **Prediction**: Use the modified model, $M_x$, and the 
updated probabilities over the $U$ variables, $P(U|E = e)$, 
to compute the expectation of $Y$, the consequence of the counterfactual.

> :warning:The following content is a brief version of the paper. If you read this and want to know more, it is better to read the paper itself.
## Discussion of the example used in the paper

Now let's talk about the paper, the aim of the 
paper is to build a model to predict other experts' opinions based on some experts' 
opinions which we already know.
This is a counterfactual inference problem, let's describe it using mathematical language.
> I just copy the content of the paper, because I think it is no need to rewrite one

Our starting point is to view the above counterfactual statement as an intervention in a particular
counterfactual SCM. More specifically, let $\mathcal{M}$ be a SCM defined by the assignments
$$
Y = f_Y(X, Z, U),
Z = f_Z(V ),
X = f_X(W)
$$
where $U$, $V$ and $W$ are (multidimensional) independent noise variables, $f_Y$, $f_Z$ and $f_X$ are given deterministic
causal mechanisms (or functions), and $Y = (Y_h)_{h\in Z}$ are the predictions by a set of human experts $Z \subseteq H$.
Then, we can express the above counterfactual statement as an intervention 
$\mathcal{I}=[Z=\{h'\}]$in the
counterfactual SCM $M_{X=x, Z={h}, Y =y_h}$ and, to infer the label prediction $y_{h'}$, we just need to resort to the
counterfactual distribution $P^{M | X=x, Z={h}, Y =y_h; do[Z={h'}]}(Y )$.

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-09_19-03.png)


## Relating the Counterfactual and Interventional Worlds

**Definition 1** (Set Invariance). 
*A mechanism $f_Y$ for variable $Y$ is set invariant with respect to $Z$ if, for any
two realizations $Z = \zeta$ and $Z = \zeta'$ such 
that $\zeta \subseteq \zeta'$, it holds that*
$$
f_Y(x, \zeta, u)=(f_Y(x, \zeta', u))_{\zeta} \text{ }{,}\text{ } 
for \text{ }all\text{ } x \in X, u \in U .
$$
*A SCM $\mathcal{M}$ with such a mechanism is set invariant for $Y$.*$\Box$

Let's see an economist joke: 
 "If all the economists were laid end to end, 
they would not reach a conclusion.” --George Bernard Shaw. 
So, in this situation, even 
if they communicate, they can't change each other's minds. Maybe this is a SI-SCM, 
$Z$ is a set of economists, while the size of $Y$ will be very huge.

**Theorem 2**. 
*Any SCM $\mathcal{M}$ with mechanism $f_Y$ of the form $f_Y(X, Z, U) = (f_{Y_h}(X, U))_{h\in Z}$, 
where $f_{Y_h} : \mathcal{X} \times \mathcal{U} \rightarrow \mathcal{Y}$
 are arbitrary functions, is set invariant for $Y$.* $\Box$

This is simple, Maybe the function $f_Y$ can be expressed as this form, and obviously, it is a SI-SCM.
$$
f_Y(X, Z, U) = \begin{cases}
  f_1(X,U)&\text{if}&Z=Z_0\\
  f_2(X,U)&\text{if}&Z=Z_1\\
  ...
\end{cases}
$$

**Theorem 3**. 
*For any SI-SCM $\mathcal{M}$, there exists an equivalent SI-SCM $\mathcal{M}'$ 
with causal mechanism
$f'_Y(X,Z,U)=(f'_{Y_h}(X,U))_{h\in Z}$
where for $h \in Z$*
$$
f'_{Y_h}(X,U):=(f_Y(X, \{h\}, U))_{h\in Z}
$$
$\Box$

The proof is simple, it is easy to construct a $\mathcal{M}'$ based on $\mathcal{M}$, we just need to define 
$(f'(x, \zeta, u))_h = f(x, \{h\}, u)$. 
However, it is hard to implement in some situations as the paper highlight.

**Theorem 4**. 
*Let SCM $\mathcal{M}$ be set invariant for $Y$. Then, for any $\zeta$, 
$\zeta'\in H$such that $\zeta \subseteq \zeta'$, it holds that*
$$
P^{\mathcal{M}; do[Z=\zeta]}(Y = y | X) = P^{\mathcal{M}; do[Z=\zeta']}((Y)_{\zeta} = y | X)
$$
*for any $y \in Y^{|\zeta|}$ where $(Y)_{\zeta}$ 
  denotes the predictions by the experts in the subset $\zeta \subseteq \zeta'$.* $\Box$

We just need to expand both sides of this equation and use the definition of set invariance, then we will get the proof.
$$
P^{\mathcal{M};\text{do}[Z:=\zeta']}(Y_{\zeta}=y|X=x)=\sum_{u\in\mathcal{U}}P(U=u)\cdot \mathcal{I}[f(x,\zeta',u)_{\zeta}=y]
$$
$$
P^{\mathcal{M};\text{do}[Z:=\zeta]}(Y=y|X=x)=\sum_{u\in\mathcal{U}}P(U=u)\cdot \mathcal{I}[f(x,\zeta,u)=y]
$$
and $f(x,\zeta',u)_{\zeta}=f(x,\zeta,u)$, so we finish the proof.

So we can conclude that if we expand the set of experts who make predictions, the
corresponding interventional distribution of $Y$ does not change. There are two corollaries, 
and the proofs are simple.

**Corollary 1**. *Let SCM $\mathcal{M}$ be set invariant for $Y$.* 
*Then, for any $h \in H$ and $\zeta \subseteq H$ such that $h \in \zeta$, it holds
that*
$$
P^{M ; do[Z=\{h\}]}(Y_h | X) = P^{M ; do[Z=\zeta]}(Y_h | X). 
$$
$\Box$

**Corollary 2**. *Let SCM $\mathcal{M}$ be set invariant for $Y$.* 
*Then, for any $h, h' \in H$ and $\zeta \subseteq H$ such that $h, h' \in \zeta$, it
holds that*
$$
P^{M | X=x,Z=\{h\},Y=c ; \text{do} [Z=\{h'\}]}(Y) = P^{M ; \text{do} [Z=\zeta]}(Y_{h'} | X = x, Y_h = c)
$$
*for any $x \in X$ and $c \in Y$.* $\Box$

The proof is similar to the proof of Theorem 4.

So, we can derive the desired equality between the counterfactual distribution and the conditional
interventional distribution by using the set invariance and the fact that the noise distribution
changes equally in both scenarios.


## Characterizing Mutually Similar Experts
**Definition 5** (Counterfactual stability). 
*A SCM $\mathcal{M}$ satisfies counterfactual stability for $h, h'$ with respect to
$Y$ if, for all $\zeta, \zeta' \subseteq H$ such that $h \in \zeta$ and $h' \in \zeta'$ 
and for all $c'\neq c$, the condition*
$$
\frac{P^{\mathcal{M}; \text{do}[Z=\zeta']}(Y_{h'}=c | X)}{P^{\mathcal{M} ; do[Z=\zeta]}(Y_h = c | X)}
\ge
\frac{P^{\mathcal{M};\text{do}[Z=\zeta']}(Y_{h'}=c'|X)}{P^{\mathcal{M};do[Z=\zeta]}(Y_h=c'|X)}
$$
*implies that $P^{\mathcal{M}|X,Z=\zeta,Y_h=c;do[Z=\zeta']}(Y_{h'}=c')=0$* *where $Y_h=c$
is the observed outcome under $\text{do}[Z = \zeta]$.* $\Box$ 


It is easy to understand, $P^{\mathcal{M}|X, Z=\zeta, Y_h=c;do[Z=\zeta']}(Y_{h'}=c')=0$
means that if we observed $Y_h=c$ at the condition $X=x, Z=\zeta$, then let doctor $h'$ 
to give an option, he won't give an another option that $Y_{h'}=c'$. Since the doctor $h'$
didn't really give an option, it is a counterfactual inference problem, we can see it 
as an intervention $\text{do}[Z=\zeta']$ 

Then let's see the condition, imagine a scenario(:warning: not strict, but it can make readers better understand the definition) , 
$P(Y_h=0)=\frac{1}{10},P(Y_{h'}=0)=\frac{1}{10}$ and $P(Y_h=1)=\frac{1}{2},P(Y_{h'}=1)=\frac{1}{10}$.
let us use a very wrong way to think of it as a probability, it means under the 
situation of $Y_h=0$, the possibility of $Y_{h'}=0$ is much higher than, 
under the situation of $Y_h=1$ the possibility of $Y_{h'}=1$.
The explanation in the original [paper](https://arxiv.org/pdf/1905.05824.pdf) is as follows:

>This definition and corollary encode the following intuition
about counterfactuals: If we had taken an alternative action
that would have only increased the probability of $Y = i$,
without increasing the likelihood of other outcomes, then
the same outcome would have occurred in the counterfactual
case. Moreover, in order for the outcome to be different
under the counterfactual distribution, the relative likelihood
of an alternative outcome must have increased relative to that
of the observed outcome. 


**Definition 6** (Conditional stability). 
*A SCM M satisfies conditional stability for two experts $h, h' \in H$ with
respect to $Y$ if, for all $\zeta \subseteq H$ such that $h, h' \in \zeta$ 
and for all $c'\neq c$, the condition*
$$
\frac{P^{\mathcal{M} ; \text{do}[Z=\zeta]}(Y_{h'} = c | X)}
{P^{\mathcal{M} ; \text{do}[Z=\zeta]}(Y_h = c | X)} \ge 
\frac{P^{\mathcal{M} ; \text{do}[Z=\zeta]}(Y_{h'} = c' | X)}
{P^{\mathcal{M} ; \text{do}[Z=\zeta]}(Y_h = c' | X)}
$$
*implies that $P^{\mathcal{M};\text{do}[Z=\zeta]}(Y_{h'} = c' | X, Y_h = c) = 0$.* $\Box$

This definition is similar to the previous one, that is, under the observation of $Y_h=c$, the doctor $h'$ will 
never give a prediction $Y_{h'}=c'$

**Theorem 7**.
*Let SCM $\mathcal{M}$ be set invariant for $Y$. Then, $\mathcal{M}$ 
satisfies counterfactual stability for $h, h' \in H$. if it satisfies conditional stability.* $\Box$

We can use Corollary 1 and Corollary 2 to prove it, use Corollary 2, we know that 
for all $\zeta_1,\zeta_2,\zeta_3 \subseteq H$ so that $h\in\zeta_1,h'\in\zeta_2,h,h'\in\zeta_3$
$$
P^{\mathcal{M}|X=x, Z=\zeta_1, Y_h=c;\text{do}[Z=\zeta_2]}(Y_{h'}=c')=0\Longleftrightarrow P^{\mathcal{M}|X=x, Z={h},Y_h=c,\text{do}[Z={h'}]}(Y_{h'}=c')=0
$$
$$
P^{\mathcal{M}|X=x,Z={h},Y_h=c,do[Z={h'}]}(Y_{h'}=c')=0\Longleftrightarrow P^{\mathcal{M};\text{do}[Z=\zeta_3]}(Y_{h'}=c'|X=x,Z=\zeta_3,Y_h=c)=0
$$
Recall that $P_{\zeta}(h,c):=P^{\mathcal{M};\text{do}[Z=\zeta]}(Y_h =c|X)$ and $p_h(c):=P^{\mathcal{M};\text{do}[Z={h}]}(Y_h=c|X)$.

As we know from Corollary 1,
$$
p_{\zeta}(h,c)=p_h(h,c)=p_{\zeta'}(h,c).
$$
Thus, 
$$
\frac{p_{\zeta_2}(h',c)}{p_{\zeta_1}(h,c)}\ge \frac{p_{\zeta_2}(h',c')}{p_{\zeta_1}(h,c')}\Longleftrightarrow\frac{p_{h'}(h',c)}{p_h(h,c)}\ge\frac{p_{h'}(h',c')}{p_h(h.c')}
\Longleftrightarrow\frac{p_{\zeta_3}(h',c)}{p_{\zeta_3}(h,c)}\ge\frac{p_{\zeta_3}(h',c')}{p_{\zeta_3}(h,c')}
$$

Then, we can make a broader definition:

**Definition 8** (Pairwise Counterfactual Stability). 
*A SCM $\mathcal{M}$ satisfies pairwise counterfactual stability for a
group of experts $\zeta \subseteq H$ with respect to $Y$ if 
it satisfies counterfactual stability for any $h, h' \in \zeta$.* $\Box$

Similarly as in the case with a pair of experts, one can also
define pairwise conditional stability and it immediately follows
from Theorem 7 that, for SI-SCM, pairwise conditional and
counterfactual stability are equivalent, as formalized by the
following Corollary.
Corollary 3. Let SCM M be set invariant for Y. Then, M

**Corollary 3**. 
*Let SCM $\mathcal{M}$ be set invariant for $Y$. Then, $\mathcal{M}$ 
satisfies pairwise counterfactual stability for
$\zeta \in H$ with respect to $Y$ if it satisfies pairwise conditional stability.* $\Box$

## Gumbel-Max SI-SCM
First, we must know what is Gumbel-Max SCM.

**Definition A** (Gumbel-Max Trick). 
*We can sample from a categorical distribution with $k$ categories as follows, where
$\tilde{p}_i$ is the unnormalized probability $P (Y = i)$: 
First, draw $\{g_1, . . . , g_k\}$ from a standard [Gumbel](https://handwiki.org/wiki/Gumbel_distribution), which can be achieved
by drawing $\{u_1, . . . , u_k\}$ iid from a $Unif(0, 1)$, and assigning
$g_i=-\log (-\log u_i)$. Then, set the outcome $j$ by taking $\arg\max _j \log \tilde{p}_j+q_j$.* $\Box$

**Definition B** (Gumbel-Max SCM).
*The Gumbel-Max SCM is a specific class of SCM in which the causal mechanism for a random categorical
variable $V$ is defined as*
$$
f_v(PA,U):=\arg\max_j\{\log P(V=j|PA)+U_j\}
$$
*and each noise variable $U_j \backsim Gumbel(0, 1)$.* $\Box$ 

**Theorem A** *The Gumbel-Max SCM satisfies the counterfactual stability condition.* $\Box$

The proof of the above theorem is not very mathematical in this [paper](https://arxiv.org/abs/1905.05824), I paste it here

>The proof is straightforward, and given in the supplement.
The intuition is that, when we consider the counterfactual
distribution, the Gumbel variables are fixed. Thus, in order
for the argmax (our observed outcome) to change in the
counterfactual, the log-likelihood of an alternative outcome
must have increased relative to our observed outcome.

Now, we can introduce the Gumbel-Max I-SCM. Given a set of experts $H$, 
the Gumbel-Max SI-SCM partitions $H$ into disjoint sets of experts $\Psi = \{\psi\}_{\psi\in\Psi}$, and associate all experts within each set to the same multidimensional noise variable.
More formally, the Gumbel-Max SI-SCM is defined as follows:

**Definition 9** (Gumbel-Max SI-SCM). 
*The Gumbel-Max SI-SCM $\mathcal{M}(\Psi)$ is a specific class of SCM in which
the causal mechanism for $Y$ is defined as*
$$
f_Y(X, Z, U) = (f_{Y_h}(X, U))_{h \in Z}
$$
*with*
$$
f_{Y_h}(X, U_{\psi (h)}) = \arg\max_{c\in\mathcal{y}}\{\log P(Y_h=c|X)+U_{\psi (h),c}\}
$$
*where $\psi(h) \in \Psi$ denotes the subgroup expert $h$ 
belongs to and each noise variable $U_{\psi(h),c} \backsim Gumbel(0, 1)$.* $\Box$

As we know from Theorem 2, $f_Y(X, Z, U) = (f_{Y_h}(X, U))_{h \in Z}$ implies that this SCM is a SI-SCM.
By definition, the Gumbel-Max SI-SCM $\mathcal{M}(\Psi)$ is set 
invariant for $Y$ and, for any $\zeta \subseteq H$ and $h \in \zeta$, it
holds that $P^{\mathcal{M}(\Psi);\text{do}[Z=\zeta]}(Y_h | X) = P(Y_h | X)$. 
Moreover, all experts within each group $\psi \in \Psi$ are mutually
similar, as formalized by the following Theorem:

**Theorem 10**. 
*The Gumbel-Max SI-SCM $\mathcal{M}(\Psi)$ satisfies pairwise counterfactual stability (PCS) 
for each group $\psi \in \Psi$ with respect to $Y$.* $\Box$. 

We can see this theorem as an extension of Theorem A, let's give the proof.
We will prove that for all sets $\zeta$, so that $h,h'\in\zeta$, and $c\neq c'$
$$
P^{\mathcal{M}(\Psi);\text{do}[Z=\zeta]}(Y_{h'}=c'|X,Y_h=c)\neq 0 \Longrightarrow
\frac{p_{\zeta}(h',c)}{p_{\zeta}(h,c)}<\frac{p_{\zeta}(h',c')}{p_{\zeta}(h,c')}
$$
If the conditional probability is positive, almost surely there must exist
Gumbel noise variables $g_{\psi, c}$ and $g_{\psi, c'}$
such that
$$
\log P(Y_h=c|X)+g_{\psi, c}>\log P(Y_h=c'|X)+g_{\psi, c'}
$$
$$
\log P(Y_{h'}=c|X)+g_{\psi, c} <\log P(Y_{h'}=c'|X)+g_{\psi, c'}
$$
Recall that, by set invariance, $p_{\zeta}(h, c) = P(Y_h = c | X)$ for all $\zeta, h, c$.
We can get this inequality :
$$
\frac{p_{\zeta}(h', c)}{p_{\zeta}(h, c)}< \frac{p_{\zeta}(h', c')}{p_{\zeta}(h,c')}
$$
This proves that 
$$
\frac{p_{\zeta}(h', c)}{p_{\zeta}(h, c)}\geq \frac{p_{\zeta}(h', c')}{p_{\zeta}(h,c')}
\Longrightarrow 
P^{\mathcal{M}(\Psi);\text{do}[Z=\zeta]}(Y_{h'}=c'|X,Y_h=c)= 0
$$

As we know from the end of [this chapter](#more-details-about-the-counterfactual-inference),
we should predict other experts' options using 
$P_{\mathcal{M};\text{do}[Z=h']} (U|E=e)$, we can use the following formula to estimating the counterfactual distributions
$$
P^{\mathcal{M}(\Psi)|X=x,Z=\{h\},Y=y_h;\text{do}[Z=\{h'\}]}(Y) \approx \frac{1}{T}\sum_{t\in T}\mathcal{I}[c=f_{Y_{h'}}(x,u_t)]
$$
where ${u_1...,u_T}$ are samples from the posterior distribution $P^{\mathcal{M}(\Psi)|X=x,Z=\{h\},Y=y_h;\text{do}[Z=\{h'\}]}(U_{\psi(h')})$
of the noise variable $U_{\psi (h')}$. We can use a picture to summarized it.

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-11_14-25.png)

Now, we know $P_{\mathcal{M};\text{do}[Z=h']} (U|E=e)$, then we can use the SCM to give a prediction.

Then, we need to partition the set of experts $\mathcal{H}$ into disjoint sets of experts $\Psi$.
If $h$ and $h'$ violate conditional stability, we conclude that $h$ and $h'$ cannot belong 
to the same group $\psi$. 
Further, we also conclude that any pair of
experts whose predictions did not violate conditional stability and were at least once observed for the same
sample can be similar. But there may be multiple vaild partitions. $\mathcal{P} = \{\Psi\}$
of the experts into disjoint sets that are consistent with the above conclusions. 
In order to decide among them, we would like to solve the following minimization problem:
$$
\min_{\Psi\in P} \sum_{h,h'\in\mathcal{H}}\mathcal{L}(\mathcal{M}(\Psi),h',h)-\mathcal{L}(\mathcal{M}(\mathcal{H},h',h))
$$

where $\mathcal{L}(\mathcal{M}(\dot),h,h')$ denotes an average (empirical) 
loss whenever we observe $Y_h$ and infer the label prediction
using counterfactual distribution $P^{\mathcal{M}(\dot)|X=x,Z=\{h\},Y=y_h;\text{do}[Z=\{h'\}]}(Y)$.
And the aim of $\mathcal{L}(\mathcal{M}(\mathcal{H}),h',h)$ is to reduce the number
of pairs $(h, h')$ we need to consider(why?).

Then we can formulate the Eq above as a clique partitioning problem, and use greedy 
algorithm to give a approximate solution ,and the algorithm works well in this situation.(From my point of view, it it just a technique
rather a idea of this paper, so I just use one sentence to describe it)

## Code implementation  

~~As a Rust fan, I would like to rewrite the [code](https://github.com/Networks-Learning/cfact-inference-second-opinions) in Rust.~~ 

The [code](https://github.com/Networks-Learning/cfact-inference-second-opinions) requires [networkx](https://networkx.org/), 
but no package does the same as it in [crates.io](https://crates.io/search?q=network).
So, forget it.....

For the experiment, I think it is useless to repeat it, this kind of behavior is as same as 
those high school teachers who do experiments on the blackboard. The difference is, it is easy to 
reproduce this experiment because we can find the code on github. So, I omitted this part.  

![](https://raw.githubusercontent.com/charleschetty/picturebed/main/picture/2023-01-19_18-42.png)
